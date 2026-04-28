/**
 * Wire connections between operators.
 *
 * Each wire describes one bezier path:
 *   from = source operator id (uses output port `outIdx`)
 *   to   = dest   operator id (uses input  port `inIdx`)
 *
 * Wire color = type of the source operator (set in <Wire/>).
 */

export interface Wire {
  id: string;
  from: string;
  outIdx: number;
  to: string;
  inIdx: number;
}

export const WIRES: Wire[] = [
  // root -> stack
  { id: "w_root_next",       from: "kpt_web",    outIdx: 0, to: "nextjs_16",     inIdx: 0 },
  { id: "w_next_react",      from: "nextjs_16",  outIdx: 0, to: "react_19",      inIdx: 0 },
  { id: "w_react_tw",        from: "react_19",   outIdx: 0, to: "tailwind_4",    inIdx: 0 },
  { id: "w_tw_ts",           from: "tailwind_4", outIdx: 0, to: "typescript",    inIdx: 0 },

  // stack -> design (visual signal chain)
  { id: "w_react_design",    from: "react_19",   outIdx: 0, to: "kpt_design",    inIdx: 0 },
  { id: "w_tw_design",       from: "tailwind_4", outIdx: 0, to: "kpt_design",    inIdx: 1 },
  { id: "w_ts_design",       from: "typescript", outIdx: 0, to: "kpt_design",    inIdx: 2 },

  // root -> services
  { id: "w_root_reg",        from: "kpt_web",    outIdx: 0, to: "kpt_registrar", inIdx: 0 },
  { id: "w_reg_host",        from: "kpt_registrar", outIdx: 0, to: "kpt_host",   inIdx: 0 },

  // services -> agents (host signal feeds the phone agent uptime)
  { id: "w_host_agents",     from: "kpt_host",   outIdx: 0, to: "kpt_agents",    inIdx: 0 },
  { id: "w_design_agents",   from: "kpt_design", outIdx: 0, to: "kpt_agents",    inIdx: 1 },

  // content fed by stack/services
  { id: "w_design_phil",     from: "kpt_design", outIdx: 0, to: "philosophy_dat",inIdx: 0 },
  { id: "w_host_telem",      from: "kpt_host",   outIdx: 0, to: "telemetry_chop",inIdx: 0 },
  { id: "w_design_telem",    from: "kpt_design", outIdx: 0, to: "telemetry_chop",inIdx: 1 },
  { id: "w_design_port",     from: "kpt_design", outIdx: 0, to: "portfolio_top", inIdx: 0 },
  { id: "w_design_proc",     from: "kpt_design", outIdx: 0, to: "process_chop",  inIdx: 0 },

  // host & telemetry -> vercel edge (deploy)
  { id: "w_host_vercel",     from: "kpt_host",   outIdx: 0, to: "vercel_edge",   inIdx: 0 },
  { id: "w_telem_vercel",    from: "telemetry_chop", outIdx: 0, to: "vercel_edge", inIdx: 1 },

  // converge into the // RUN exec
  { id: "w_vercel_run",      from: "vercel_edge", outIdx: 0, to: "cta_exec",     inIdx: 0 },
  { id: "w_agents_run",      from: "kpt_agents",  outIdx: 0, to: "cta_exec",     inIdx: 1 },
  { id: "w_proc_run",        from: "process_chop",outIdx: 0, to: "cta_exec",     inIdx: 2 },
];
