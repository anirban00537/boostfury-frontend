"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

const ParticlesContainer = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, []);

  return (
    <Particles
      className="absolute inset-0 -z-10 animate-fade-in"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          color: {
            value: "#D3D3D3", // Set all particles to lighter gray
          },
          links: {
            color: "#D3D3D3", // Set link color to lighter gray
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 1.5, // Increased speed for more dynamic movement
            straight: false,
            path: {
              enable: true,
              delay: {
                value: 0
              },
            },
          },
          depth: {
            enable: true,
            value: 100, // Adjust to control the 3D effect intensity
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100, // Increased particle count
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: ["circle", "polygon"],
            polygon: {
              sides: 6, // Add hexagons for a tech feel
            },
          },
          size: {
            value: { min: 1, max: 4 }, // Slightly larger particles
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesContainer;