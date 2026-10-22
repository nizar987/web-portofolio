import type { DiagramKind } from "@/lib/portfolio";

/*
 * Schematic illustrations for each case study. Strokes marked `data-draw` are
 * line-drawn on scroll; `data-flow-dot` circles travel along the path named in
 * `data-path` (see PageMotion). Boxes are painted after the routes so moving
 * dots pass "through" them.
 */

const STROKE = "#55524a";
const BOX_STROKE = "#3a3833";
const BOX_FILL = "#0d0d0b";
const LABEL = "#a7a398";
const FAINT = "#7c786f";
const SIGNAL = "#ff6a2b";
const OK = "#9bc59d";

const labelProps = { fill: LABEL, fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" } as const;
const routeProps = { fill: "none", stroke: STROKE, strokeWidth: 1.25, "data-draw": true } as const;
const boxProps = { fill: BOX_FILL, stroke: BOX_STROKE, strokeWidth: 1.25, rx: 10, "data-draw": true } as const;

interface FlowDotProps {
  path: string;
}

function FlowDot({ path }: FlowDotProps) {
  return <circle data-flow-dot data-path={path} fill={SIGNAL} opacity={0} r={3.5} />;
}

function QueueDiagram() {
  const workers = [70, 170, 270];

  return (
    <>
      {workers.map((y, i) => (
        <path {...routeProps} d={`M144 170 H346 C381 170 381 ${y} 416 ${y}`} id={`queue-route-${i}`} key={y} />
      ))}
      {workers.map((y, i) => (
        <FlowDot key={y} path={`queue-route-${i}`} />
      ))}

      <rect {...boxProps} height={60} width={120} x={24} y={140} />
      <text {...labelProps} x={44} y={166}>DJANGO APP</text>
      <text {...labelProps} fill={FAINT} x={44} y={184}>requests</text>

      <text {...labelProps} fill={FAINT} x={150} y={158}>enqueue</text>

      <rect {...boxProps} height={70} width={132} x={214} y={135} />
      {[0, 1, 2, 3, 4].map((slot) => (
        <rect
          fill={slot < 3 ? SIGNAL : "none"}
          fillOpacity={slot < 3 ? 0.85 - slot * 0.25 : 0}
          height={46}
          key={slot}
          rx={3}
          stroke={slot < 3 ? "none" : BOX_STROKE}
          width={16}
          x={228 + slot * 22}
          y={147}
        />
      ))}
      <text {...labelProps} x={214} y={228}>REDIS QUEUE</text>

      {workers.map((y, i) => (
        <g key={y}>
          <rect {...boxProps} height={52} width={120} x={416} y={y - 26} />
          <text {...labelProps} x={436} y={y + 4}>
            WORKER {i + 1}
          </text>
        </g>
      ))}

      <text {...labelProps} fill={FAINT} x={24} y={318}>
        async — off the request path
      </text>
    </>
  );
}

function Cylinder({ cx, label, sublabel }: { cx: number; label: string; sublabel: string }) {
  const rx = 58;
  const top = 112;
  const bottom = 222;

  return (
    <g>
      <path
        d={`M${cx - rx} ${top} V${bottom} A${rx} 14 0 0 0 ${cx + rx} ${bottom} V${top}`}
        fill={BOX_FILL}
        stroke={BOX_STROKE}
        strokeWidth={1.25}
        data-draw
      />
      <ellipse cx={cx} cy={top} fill={BOX_FILL} rx={rx} ry={14} stroke={BOX_STROKE} strokeWidth={1.25} data-draw />
      <path d={`M${cx - rx} ${top + 36} A${rx} 14 0 0 0 ${cx + rx} ${top + 36}`} fill="none" stroke={BOX_STROKE} data-draw />
      <path d={`M${cx - rx} ${top + 72} A${rx} 14 0 0 0 ${cx + rx} ${top + 72}`} fill="none" stroke={BOX_STROKE} data-draw />
      <text {...labelProps} textAnchor="middle" x={cx} y={262}>
        {label}
      </text>
      <text {...labelProps} fill={FAINT} textAnchor="middle" x={cx} y={280}>
        {sublabel}
      </text>
    </g>
  );
}

function MigrationDiagram() {
  const stages = ["SCHEMA", "QUERIES", "APIS"];

  return (
    <>
      <path {...routeProps} d="M142 167 H418" id="migration-route" />
      <FlowDot path="migration-route" />

      <Cylinder cx={84} label="LEGACY ERP" sublabel="source" />
      <Cylinder cx={476} label="FRAPPE · MARIADB" sublabel="target" />

      {stages.map((stage, i) => {
        const x = 170 + i * 80;
        return (
          <g key={stage}>
            <rect {...boxProps} height={44} width={60} x={x} y={145} />
            <text {...labelProps} data-compact fontSize={10} textAnchor="middle" x={x + 30} y={171}>
              {stage}
            </text>
            <path d={`M${x + 22} 214 l5 5 l10 -10`} fill="none" stroke={OK} strokeLinecap="round" strokeWidth={1.5} data-draw />
          </g>
        );
      })}
      <text {...labelProps} fill={FAINT} textAnchor="middle" x={280} y={246}>
        verified per stage
      </text>

      <text {...labelProps} fill={FAINT} x={24} y={318}>
        0 records lost — minimal downtime
      </text>
    </>
  );
}

function AutomationDiagram() {
  const outputs = [
    { y: 100, label: "NOTIFY" },
    { y: 240, label: "SYNC" }
  ];

  return (
    <>
      {outputs.map((output, i) => (
        <path
          {...routeProps}
          d={`M104 170 H386 C408 170 408 ${output.y} 430 ${output.y}`}
          id={`automation-route-${i}`}
          key={output.label}
        />
      ))}
      {outputs.map((output, i) => (
        <FlowDot key={output.label} path={`automation-route-${i}`} />
      ))}

      <circle cx={70} cy={170} fill={BOX_FILL} r={34} stroke={BOX_STROKE} strokeWidth={1.25} data-draw />
      <path d="M70 150 V170 L84 178" fill="none" stroke={SIGNAL} strokeLinecap="round" strokeWidth={1.5} data-draw />
      <text {...labelProps} textAnchor="middle" x={70} y={228}>CRON</text>

      <rect {...boxProps} height={48} width={104} x={150} y={146} />
      <text {...labelProps} x={164} y={174}>TRANSFORM</text>

      <rect {...boxProps} height={48} width={96} x={290} y={146} />
      <text {...labelProps} x={312} y={174}>BRANCH</text>

      {outputs.map((output) => (
        <g key={output.label}>
          <rect {...boxProps} height={48} width={104} x={430} y={output.y - 24} />
          <text {...labelProps} x={450} y={output.y + 4}>
            {output.label}
          </text>
        </g>
      ))}

      <text {...labelProps} fill={FAINT} x={24} y={318}>
        n8n workflow — no manual hand-offs
      </text>
    </>
  );
}

const diagrams: Record<DiagramKind, () => React.ReactNode> = {
  queue: QueueDiagram,
  migration: MigrationDiagram,
  automation: AutomationDiagram
};

interface ProjectDiagramProps {
  kind: DiagramKind;
  title: string;
}

export function ProjectDiagram({ kind, title }: ProjectDiagramProps) {
  const Diagram = diagrams[kind];

  return (
    <svg className="h-auto w-full" data-diagram role="img" viewBox="0 0 560 340">
      <title>{`${title} architecture diagram`}</title>
      <Diagram />
    </svg>
  );
}
