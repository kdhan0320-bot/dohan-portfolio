export const heroChipSx = {
  bgcolor: "rgba(255,255,255,0.16)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.68rem",
  border: "1px solid rgba(255,255,255,0.22)",
};

export const heroSurfaceSx = {
  backgroundImage:
    "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.08) 0%, transparent 42%), radial-gradient(circle at 100% 10%, rgba(6,182,212,0.07) 0%, transparent 38%)",
  backgroundRepeat: "no-repeat",
};

export const cardCanvasSx = {
  bgcolor: "#F8FAFC",
  backgroundImage:
    "radial-gradient(circle at 10% 22%, rgba(99,102,241,0.055) 0%, transparent 40%), radial-gradient(circle at 92% 68%, rgba(6,182,212,0.05) 0%, transparent 38%)",
  backgroundRepeat: "no-repeat",
};

export const cardShelfSx = {
  position: "relative",
  mt: "-10px",
  borderRadius: "18px 18px 0 0",
  boxShadow: "0 -8px 16px -8px rgba(15,23,42,0.10)",
  pt: "10px",
  ...cardCanvasSx,
};
