import {
  Bot,
  Brain,
  ChartColumn,
  ChartScatter,
  Cloud,
  Code,
  Container,
  Cpu,
  Database,
  Gauge,
  Globe,
  MessageSquareText,
  Network,
  ScanEye,
  Server,
  Share2,
  SquareTerminal,
  Timer,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  siCplusplus,
  siDart,
  siFlask,
  siFlutter,
  siJavascript,
  siNextdotjs,
  siOpenjdk,
  siPython,
  siReact,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Skill name (as written in data/content.ts) → icon. Unknown names get a generic code icon.
const brand: Record<string, SimpleIcon> = {
  Python: siPython,
  Java: siOpenjdk,
  "C++": siCplusplus,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Dart: siDart,
  React: siReact,
  "Next.js": siNextdotjs,
  Flask: siFlask,
  Flutter: siFlutter,
};

const generic: Record<string, LucideIcon> = {
  SQL: Database,
  "Machine Learning": Brain,
  "Deep Learning": Network,
  "Explainable AI": ScanEye,
  "Explainable AI (SHAP, Integrated Gradients)": ScanEye,
  "Federated Learning": Share2,
  NLP: MessageSquareText,
  "LLM Integration": Bot,
  "Agentic AI": Workflow,
  "Prompt Engineering": SquareTerminal,
  "Data Engineering": Database,
  EDA: ChartScatter,
  Visualization: ChartColumn,
  "Web Scraping": Globe,
  "LLM Serving": Server,
  "Quantization & Optimization": Gauge,
  "GPU Inference": Cpu,
  "Inference APIs": Zap,
  "Latency & Throughput Tuning": Timer,
  "Cloud Deployment": Cloud,
  Containerization: Container,
};

export const hasBrandIcon = (name: string) => name in brand;

// Near-black brand colours would vanish in dark mode, so those use the text colour instead.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const icon = brand[name];
  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("size-6", className)}
        fill={isDark(icon.hex) ? "currentColor" : `#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = generic[name] ?? Code;
  return <Icon aria-hidden className={cn("size-6 text-accent", className)} />;
}
