import React, { useEffect, useState, useRef, UIEvent } from "react";
import { 
  X, 
  Folder, 
  FolderOpen, 
  FileText, 
  FileCode, 
  ChevronRight, 
  ChevronDown, 
  Github, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Image as ImageIcon,
  FileSpreadsheet,
  GitBranch,
  File
} from "lucide-react";
import { motion } from "motion/react";
import { repositoryData } from "../data/repoData";

interface FileNode {
  name: string;
  type: "folder" | "file";
  fileType?: "code" | "csv" | "markdown" | "image" | "pdf" | "text";
  content?: string;
  size?: string;
  rowCount?: number;
  imageUrl?: string;
  downloadUrl?: string;
  caption?: string;
  children?: FileNode[];
}

const getFileIcon = (item: FileNode) => {
  if (item.type === "folder") {
    return null;
  }
  if (item.fileType === "image" || item.name.endsWith(".png")) {
    return <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />;
  }
  if (item.fileType === "csv" || item.name.endsWith(".csv")) {
    return <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />;
  }
  if (item.fileType === "pdf" || item.name.endsWith(".pdf")) {
    return <FileText className="w-4 h-4 text-red-400 shrink-0" />;
  }
  if (item.name.endsWith(".py")) {
    return <FileCode className="w-4 h-4 text-sky-400 shrink-0" />;
  }
  if (item.name.endsWith(".md")) {
    return <FileText className="w-4 h-4 text-amber-400 shrink-0" />;
  }
  return <File className="w-4 h-4 text-neutral-400 shrink-0" />;
};

interface FileTreeItemProps {
  key?: string;
  item: FileNode;
  depth?: number;
  path?: string;
  onSelect: (item: FileNode, path: string) => void;
  selectedFile: FileNode | null;
}

const FileTreeItem = ({ item, depth = 0, path = "", onSelect, selectedFile }: FileTreeItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const currentPath = path ? `${path}/${item.name}` : item.name;
  const isSelected = selectedFile?.name === item.name && item.type === "file";

  if (item.type === "folder") {
    return (
      <div className="w-full select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 w-full hover:bg-white/10 px-2 py-1.5 rounded-lg text-sm text-neutral-300 transition-colors group text-left"
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
        >
          <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </span>
          {isOpen ? (
            <FolderOpen className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="truncate font-medium text-xs md:text-sm text-neutral-200">{item.name}</span>
        </button>
        {isOpen && item.children && (
          <div className="flex flex-col">
            {item.children.map((child) => (
              <FileTreeItem
                key={child.name}
                item={child}
                depth={depth + 1}
                path={currentPath}
                onSelect={onSelect}
                selectedFile={selectedFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(item, currentPath)}
      className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm transition-all text-left group ${
        isSelected 
          ? "bg-emerald-500/20 text-emerald-300 font-medium" 
          : "hover:bg-white/10 text-neutral-400 hover:text-neutral-200"
      }`}
      style={{ paddingLeft: `${depth * 14 + 26}px` }}
    >
      {getFileIcon(item)}
      <span className="truncate text-xs md:text-sm">{item.name}</span>
    </button>
  );
};

interface RepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RepositoryModal({ isOpen, onClose }: RepositoryModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Find README.md by default
  const defaultFile = repositoryData.fileSystem.children.find(
    (c) => c.name === "README.md"
  ) as FileNode;
  
  const [selectedFile, setSelectedFile] = useState<FileNode>(defaultFile);
  const [selectedPath, setSelectedPath] = useState<string>("README.md");
  const [copied, setCopied] = useState(false);
  const [csvMode, setCsvMode] = useState<"table" | "raw">("table");

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalScroll = target.scrollHeight - target.clientHeight;
    if (totalScroll > 0) {
      setScrollProgress(target.scrollTop / totalScroll);
    } else {
      setScrollProgress(0);
    }
  };

  const handleSelectFile = (file: FileNode, path: string) => {
    setSelectedFile(file);
    setSelectedPath(path);
  };

  const handleCopy = () => {
    if (selectedFile?.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    setScrollProgress(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedFile]);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen && !isMounted) return null;

  // Split lines for code display
  const contentLines = selectedFile?.content ? selectedFile.content.split("\n") : [];

  // Parse CSV rows if csv
  const csvRows = (selectedFile?.fileType === "csv" && selectedFile.content) 
    ? selectedFile.content.split("\n").filter(row => !row.startsWith("..."))
    : [];
  const csvHeaders = csvRows.length > 0 ? csvRows[0].split(",") : [];
  const csvDataRows = csvRows.slice(1, 40).map(row => row.split(","));

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div 
        className={`relative w-full max-w-6xl h-[88vh] bg-[#0c0c0c] border border-white/10 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/10 bg-[#090909] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Github className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <span className="text-white font-semibold text-sm md:text-base tracking-tight truncate">
                mohgeb / {repositoryData.name}
              </span>
              <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 font-mono">
                <GitBranch className="w-3 h-3 text-emerald-400" />
                {repositoryData.branch}
              </span>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 bg-transparent hover:bg-white/10 text-neutral-400 hover:text-white rounded-full flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Sidebar - Explorer */}
          <div className="w-56 sm:w-64 md:w-72 border-r border-white/10 bg-[#0a0a0a] overflow-y-auto shrink-0 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5 px-2 pt-1">
                <span>Repository Files</span>
                <span className="text-[10px] text-neutral-500 font-mono">Git tree</span>
              </div>
              <div className="space-y-0.5">
                {repositoryData.fileSystem.children.map((child) => (
                  <FileTreeItem
                    key={child.name}
                    item={child as FileNode}
                    onSelect={handleSelectFile}
                    selectedFile={selectedFile}
                  />
                ))}
              </div>
            </div>

            {/* Quick Repo Metadata */}
            <div className="pt-4 border-t border-white/5 mt-4 px-2 space-y-2 text-xs text-neutral-500 hidden sm:block">
              <div className="flex items-center justify-between">
                <span>Language</span>
                <span className="text-neutral-300 font-medium">Python 3.8+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Framework</span>
                <span className="text-neutral-300 font-medium">PyTorch / Scikit-Learn</span>
              </div>
              <div className="flex items-center justify-between">
                <span>License</span>
                <span className="text-neutral-300 font-medium">MIT</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden relative">
            {/* File Header Bar */}
            <div className="px-4 py-2.5 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between gap-2 shrink-0 relative">
              <div className="flex items-center gap-2 min-w-0">
                {getFileIcon(selectedFile)}
                <span className="text-xs md:text-sm text-neutral-200 font-mono truncate">
                  {selectedPath || selectedFile?.name}
                </span>
                {selectedFile?.size && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5 font-mono">
                    {selectedFile.size}
                  </span>
                )}
                {contentLines.length > 0 && !selectedFile?.imageUrl && selectedFile?.fileType !== "pdf" && (
                  <span className="text-[11px] text-neutral-500 hidden sm:inline-block font-mono">
                    • {contentLines.length} lines
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selectedFile?.fileType === "csv" && (
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setCsvMode("table")}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        csvMode === "table" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setCsvMode("raw")}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        csvMode === "raw" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Raw
                    </button>
                  </div>
                )}

                {selectedFile?.content && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                    title="Copy file contents"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden md:inline">{copied ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </div>

              {/* Top Progress Bar for Scroll Tracking */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 origin-left"
                style={{ scaleX: scrollProgress, width: "100%" }}
              />
            </div>
            
            {/* File Content Body */}
            <div 
              ref={scrollRef} 
              onScroll={handleScroll} 
              className="flex-1 overflow-auto p-4 md:p-6 scrollbar-hide"
            >
              {selectedFile ? (
                <>
                  {/* IMAGE VIEWER */}
                  {selectedFile.fileType === "image" && selectedFile.imageUrl && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-4">
                      <div className="relative max-w-2xl w-full bg-[#0a0a0a] p-3 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                        <img 
                          src={selectedFile.imageUrl} 
                          alt={selectedFile.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-auto rounded-xl object-contain"
                        />
                      </div>
                      {selectedFile.caption && (
                        <p className="text-sm text-neutral-400 text-center max-w-lg bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                          {selectedFile.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* PDF VIEWER / DOWNLOAD CARD */}
                  {selectedFile.fileType === "pdf" && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center max-w-xl mx-auto">
                      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {selectedFile.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                        Formal Research Paper: <em>Comparative Analysis between Deep Feedforward Neural Networks and Linear Baseline Classifiers on Fine-Needle Aspirate (FNA) Cytopathological Data</em>. Developed for MATH 4330 under Dr. Chris Monico.
                      </p>
                      <div className="flex items-center gap-3">
                        {selectedFile.downloadUrl && (
                          <a 
                            href={selectedFile.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-neutral-200 transition-colors"
                          >
                            <Download className="w-4 h-4" /> Open Full PDF ({selectedFile.size})
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CSV TABLE / RAW VIEWER */}
                  {selectedFile.fileType === "csv" && csvMode === "table" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                        <span>Showing sample of 569 instances ({csvHeaders.length} physiological dimensions)</span>
                        <span className="text-neutral-500">Target: 0 = Malignant, 1 = Benign</span>
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080808]">
                        <table className="w-full text-left text-xs border-collapse font-mono">
                          <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-neutral-300">
                              <th className="p-2.5 border-r border-white/5 text-neutral-500">#</th>
                              {csvHeaders.map((head, i) => (
                                <th key={i} className="p-2.5 whitespace-nowrap border-r border-white/5 font-semibold text-neutral-200">
                                  {head}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {csvDataRows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-2.5 text-neutral-500 border-r border-white/5">{rIdx + 1}</td>
                                {row.map((val, cIdx) => (
                                  <td 
                                    key={cIdx} 
                                    className={`p-2.5 whitespace-nowrap border-r border-white/5 ${
                                      cIdx === row.length - 1 
                                        ? val.trim() === "0" 
                                          ? "text-red-400 font-bold" 
                                          : "text-emerald-400 font-bold"
                                        : "text-neutral-300"
                                    }`}
                                  >
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* STANDARD CODE / TEXT VIEWER (OR RAW CSV) */}
                  {(selectedFile.fileType !== "image" && selectedFile.fileType !== "pdf" && (selectedFile.fileType !== "csv" || csvMode === "raw")) && (
                    <div className="flex font-mono text-xs md:text-sm leading-relaxed">
                      {/* Line Numbers Gutter */}
                      <div className="select-none text-neutral-600 text-right pr-4 border-r border-white/5 mr-4 shrink-0 font-mono">
                        {contentLines.map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>

                      {/* Code Lines */}
                      <div className="overflow-x-auto flex-1 text-neutral-300 whitespace-pre">
                        {contentLines.map((line, i) => {
                          const isComment = line.trim().startsWith("#") || line.trim().startsWith("//");
                          const isHeader = line.startsWith("# ") || line.startsWith("## ");
                          const isImport = line.startsWith("import ") || line.startsWith("from ");
                          const isClassOrDef = line.startsWith("class ") || line.startsWith("def ");

                          let colorClass = "text-neutral-300";
                          if (isComment) colorClass = "text-neutral-500 italic";
                          else if (isHeader) colorClass = "text-emerald-400 font-bold";
                          else if (isImport) colorClass = "text-sky-300";
                          else if (isClassOrDef) colorClass = "text-amber-300 font-semibold";

                          return (
                            <div key={i} className={`${colorClass} hover:bg-white/[0.02]`}>
                              {line || " "}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500">
                  Select a file from the explorer to view its content
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 md:px-6 py-3.5 border-t border-white/10 bg-[#090909] shrink-0 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Synchronized with GitHub
            </span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-500 font-mono">
              Texas Tech University • MATH 4330
            </span>
          </div>

          <a 
            href={repositoryData.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs md:text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-sm ml-auto"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
