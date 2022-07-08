import { Box } from "theme-ui";

export function Dropdown({ children, buttonHeight, maxWidth, show, width }) {
  if (!show) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0px auto auto 0px",
        m: 0,
        transform: `translate(0px, ${buttonHeight}px)`,
        zIndex: 10000,
        width,
        maxWidth,
      }}
    >
      {children}
    </Box>
  );
}

Dropdown.defaultProps = {
  buttonHeight: 40,
};

export function DropdownMenu({ children, show, showProp }) {
  const sx = {
    position: "relative",
  };

  sx[showProp] = show
    ? showProp === "display"
      ? "block"
      : "visible"
    : showProp === "display"
    ? "none"
    : "hidden";

  return <Box sx={sx}>{children}</Box>;
}

DropdownMenu.defaultProps = {
  show: true,
  showProp: "display",
};