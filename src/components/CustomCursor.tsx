import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start offscreen
  const [isVisible, setIsVisible] = useState(true); // Set to true by default
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // We'll set the position when mouse moves, no need for initial center position
    // This prevents the cursor from appearing in the center of the screen initially

    const updatePosition = (e: MouseEvent) => {
      // Update cursor position immediately with no delay
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Always keep cursor visible within the window
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide when actually leaving the window, not elements within it
      if (e.relatedTarget === null) {
        setIsVisible(false);
      }
    };
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    // Check if hovering over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(
          target.tagName,
        ) ||
        (target.hasAttribute("role") &&
          target.getAttribute("role") === "button") ||
        (target.hasAttribute("data-cursor") &&
          target.getAttribute("data-cursor") === "pointer");

      setIsHovering(isInteractive);
    };

    // Add event listeners
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Set visible after component mounts (with a slight delay to ensure DOM is ready)
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      // No timeout to clear anymore

      clearTimeout(visibilityTimer);
    };
  }, []);

  // Always render the cursor, but control visibility with CSS
  // This prevents the cursor from disappearing unexpectedly

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      {/* Hollow circle cursor */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "30px" : "20px",
          height: isHovering ? "30px" : "20px",
          border: `2px solid #ffffff`, // Use white for better visibility with thinner border
          borderRadius: "50%",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
          opacity: isHovering ? 0.9 : 0.8,
          // Scale based on state (hover/active)
          transform: isActive
            ? `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(0.8)`
            : `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      />
      {/* No following dot */}
    </div>
  );
};

export default CustomCursor;
