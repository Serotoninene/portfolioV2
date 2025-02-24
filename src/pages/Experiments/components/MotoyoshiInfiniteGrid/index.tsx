import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";
import { Photo } from "./Photo";

const ASPECT_RATIO = 9 / 16;

const photosData = [
  {
    name: "Striking Woman in Yellow Blazer.jpeg",
    key: "skRwIEbJ4UkGBlwPBMTXEYlhq87yGp6ZoMIQC4zc2rFA3VKv",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBlwPBMTXEYlhq87yGp6ZoMIQC4zc2rFA3VKv",
    size: 223102,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Monochromatic Elegance.jpeg",
    key: "skRwIEbJ4UkGKyxb8d6gsn8bwcJy3NrxkXYj50qdQMuHAezP",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGKyxb8d6gsn8bwcJy3NrxkXYj50qdQMuHAezP",
    size: 89546,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Serene Portrait of a Young Woman.jpeg",
    key: "skRwIEbJ4UkGUqquHcgFnTS31BKxvozY6Rc9XiAEC07r524V",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUqquHcgFnTS31BKxvozY6Rc9XiAEC07r524V",
    size: 111491,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Fashion Portrait with Orange Background.jpeg",
    key: "skRwIEbJ4UkGYVCOupfF8qru3tcXjlnCQmdbZk7yAgeLp9Mi",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGYVCOupfF8qru3tcXjlnCQmdbZk7yAgeLp9Mi",
    size: 56507,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Coffee in Garden Café.jpeg",
    key: "skRwIEbJ4UkGWcJUdQesCIJkYwz1KcmFb3dGRgW9o7eEjMh5",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGWcJUdQesCIJkYwz1KcmFb3dGRgW9o7eEjMh5",
    size: 125446,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Striking Pose in Vibrant Colors.jpeg",
    key: "skRwIEbJ4UkG0QXAwcmT4CVNbjW2tH8verwLfU1BF7iPYyqX",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG0QXAwcmT4CVNbjW2tH8verwLfU1BF7iPYyqX",
    size: 106997,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Contemporary Fashion Portrait.jpeg",
    key: "skRwIEbJ4UkGio5YOOPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGio5YOOPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
    size: 87756,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Striking Fashion Portrait.jpeg",
    key: "skRwIEbJ4UkGkzYa8DZKBuRdcW7DSvIfnP8oU9qYVjML0wlx",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGkzYa8DZKBuRdcW7DSvIfnP8oU9qYVjML0wlx",
    size: 62274,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Serene Portrait of a Young Woman (1).jpeg",
    key: "skRwIEbJ4UkG1DSlWkrSuEeAlhHfvPGa2zj6Xmgc3DTrp48Z",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG1DSlWkrSuEeAlhHfvPGa2zj6Xmgc3DTrp48Z",
    size: 125034,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Stylish Woman with Yellow-Tinted Glasses.jpeg",
    key: "skRwIEbJ4UkGbMm7fRLpjezkPh5QtSomWBabXMwRUcdNKxVT",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGbMm7fRLpjezkPh5QtSomWBabXMwRUcdNKxVT",
    size: 124776,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Portrait of a Young Woman Against Red Background.jpeg",
    key: "skRwIEbJ4UkGQpEeLAcXxy3LjqpuHb6m7GfiwIBaWSevTOc9",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQpEeLAcXxy3LjqpuHb6m7GfiwIBaWSevTOc9",
    size: 91002,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Playful Person with Green Hat.jpeg",
    key: "skRwIEbJ4UkGZhbwjKEGN9CJye1onf27hS8viYKRxF3LagXq",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGZhbwjKEGN9CJye1onf27hS8viYKRxF3LagXq",
    size: 160696,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Urban Chic Fashion Portrait.jpeg",
    key: "skRwIEbJ4UkGihb4FDPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGihb4FDPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
    size: 208972,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Portrait of a Young Woman.jpeg",
    key: "skRwIEbJ4UkG6BE7iqaCc0AWbg7XQNGh5rYpPy3HzZ4jeDnK",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG6BE7iqaCc0AWbg7XQNGh5rYpPy3HzZ4jeDnK",
    size: 193384,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Serene Branch in Clay Pot.jpeg",
    key: "skRwIEbJ4UkGHIgHVUyN3jaIWxDC7Qdio5czvrmbwtKSYeq6",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGHIgHVUyN3jaIWxDC7Qdio5czvrmbwtKSYeq6",
    size: 162299,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Elegant Portrait.jpeg",
    key: "skRwIEbJ4UkG8jqVNQvyKrt0p6Imjg41sUn7OSadlYDvWhEV",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG8jqVNQvyKrt0p6Imjg41sUn7OSadlYDvWhEV",
    size: 171886,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Modern Minimalist Portrait.jpeg",
    key: "skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK",
    size: 58340,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Portrait of a Woman Against Blue Sky.jpeg",
    key: "skRwIEbJ4UkGhrjq7CzJxvWinK18Uar9tDYMRGzFsybum3XZ",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGhrjq7CzJxvWinK18Uar9tDYMRGzFsybum3XZ",
    size: 135651,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Minimalist Composition with Dried Flowers.jpeg",
    key: "skRwIEbJ4UkGPbseOlxB1RqTnNFd5t9IskZDfWGgh3Axue0i",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGPbseOlxB1RqTnNFd5t9IskZDfWGgh3Axue0i",
    size: 108658,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Serene Young Woman with Auburn Hair.jpeg",
    key: "skRwIEbJ4UkGUgPswjFnTS31BKxvozY6Rc9XiAEC07r524Vy",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUgPswjFnTS31BKxvozY6Rc9XiAEC07r524Vy",
    size: 96269,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Stylish Woman in Color Block Jacket.jpeg",
    key: "skRwIEbJ4UkGUMwyuiFnTS31BKxvozY6Rc9XiAEC07r524Vy",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUMwyuiFnTS31BKxvozY6Rc9XiAEC07r524Vy",
    size: 111176,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Bowl of Ice Cream.jpeg",
    key: "skRwIEbJ4UkGPdhsQGbxB1RqTnNFd5t9IskZDfWGgh3Axue0",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGPdhsQGbxB1RqTnNFd5t9IskZDfWGgh3Axue0",
    size: 68761,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Serene Listening.jpeg",
    key: "skRwIEbJ4UkGAFrm4ordHpEckhiwbCf52orVMZau8P6dBOQz",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAFrm4ordHpEckhiwbCf52orVMZau8P6dBOQz",
    size: 858091,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Corgi in a Green Hat.jpeg",
    key: "skRwIEbJ4UkGXntgd45f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXntgd45f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
    size: 161594,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Serene Portrait with Geometric Earrings.jpeg",
    key: "skRwIEbJ4UkGGBrepFWpKtZaehzdVbw3L9Mc2xsjfXInr1Sk",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGGBrepFWpKtZaehzdVbw3L9Mc2xsjfXInr1Sk",
    size: 201507,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Metallic Portrait of Serene Woman.jpeg",
    key: "skRwIEbJ4UkGX9cSjl5f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGX9cSjl5f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
    size: 307498,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Serene Wooden Chair in Sunlit Room.jpeg",
    key: "skRwIEbJ4UkGTphvODQMEmWIjKoDvpOiat3Rq42fJL1dCuSw",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGTphvODQMEmWIjKoDvpOiat3Rq42fJL1dCuSw",
    size: 105395,
    uploadedAt: "2025-02-01T20:13:33.000Z",
  },
  {
    name: "Portrait with Orange Background.jpeg",
    key: "skRwIEbJ4UkGQKUyKMXxy3LjqpuHb6m7GfiwIBaWSevTOc9R",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQKUyKMXxy3LjqpuHb6m7GfiwIBaWSevTOc9R",
    size: 63979,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Modern Interior with Minimalist Staircase.jpeg",
    key: "skRwIEbJ4UkGAMzsMwdHpEckhiwbCf52orVMZau8P6dBOQzY",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAMzsMwdHpEckhiwbCf52orVMZau8P6dBOQzY",
    size: 160820,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
  {
    name: "Fashion Portrait with Monochromatic Red Background.jpeg",
    key: "skRwIEbJ4UkGXkodMuJ5f1OuCjGxsiovyYSkHE5be2Rp7Z3I",
    customId: null,
    url: "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXkodMuJ5f1OuCjGxsiovyYSkHE5be2Rp7Z3I",
    size: 65882,
    uploadedAt: "2025-02-01T20:13:34.000Z",
  },
];

const Grid = ({ rows = 4, cols = 10, gap = 10, planeSize = 6 }) => {
  const { viewport } = useThree();
  const gridRef = useRef<THREE.Group>(null);
  const scrollPosition = useRef(0);

  const momentum = useRef(0);

  const gridDimensions = useMemo(() => {
    const coordinates = [];
    let count = 0;

    // Calculate plane dimensions using aspect ratio
    const planeWidth = planeSize;
    const planeHeight = planeSize / ASPECT_RATIO;

    // Calculate total height needed for grid (including gaps)
    const totalHeight = rows * planeHeight + (rows - 1) * gap;

    // Add margins (gap) on top and bottom
    const availableHeight = viewport.height - 1;

    // Calculate scale factor based only on height
    const scaleFactor = availableHeight / totalHeight;

    // Adjust size and gap based on scale
    const adjustedPlaneWidth = planeWidth * scaleFactor;
    const adjustedPlaneHeight = planeHeight * scaleFactor;
    const adjustedGapY = gap * scaleFactor;
    const adjustedGapX = (viewport.width * 1.2) / cols;

    // Calculate total width after scaling (for centering)
    const totalWidth = cols * adjustedPlaneWidth + (cols - 1) * adjustedGapX;

    // Calculate starting position (centered horizontally)
    const startX = -totalWidth / 2;
    const startY = -(totalHeight * scaleFactor) / 2;

    let index = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x =
          startX +
          j * (adjustedPlaneWidth + adjustedGapX) +
          adjustedPlaneWidth / 2;
        const y =
          startY +
          i * (adjustedPlaneHeight + adjustedGapY) +
          adjustedPlaneHeight / 2;

        count = (count + 1) % photosData.length;

        coordinates.push({
          key: `${i}-${j}-photo`,
          x,
          y,
          width: planeWidth * scaleFactor,
          height: planeHeight * scaleFactor,
          url: photosData[count].url,
          idx: index,
        });

        index++;
      }
    }
    return { coordinates, totalWidth, adjustedGapX, adjustedGapY };
  }, [rows, cols, gap, planeSize, viewport.height]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaX + e.deltaY;
    scrollPosition.current += delta * 0.0005; // Reduced from 0.001 to 0.0005
    momentum.current = delta; // Reduced from 0.5 to 0.2
  };

  // Only for desktop so far
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const STOP_THRESHOLD = 1;

  useFrame(({ viewport }, delta) => {
    if (!gridRef.current) return;

    if (Math.abs(momentum.current) > STOP_THRESHOLD) {
      const scrollMultiplier =
        Math.abs(momentum.current) > 0.1 ? delta / 64 : delta / 128;
      scrollPosition.current += momentum.current * scrollMultiplier;

      // Instead of a fixed friction value, we dynamically adjust it
      const baseFriction = 0.92; // Adjust as needed
      const speedFriction = 1 - Math.exp(-Math.abs(momentum.current) * 5);
      const friction = Math.min(baseFriction + speedFriction, 0.98);

      momentum.current *= friction;
    }
    gridRef.current.position.x +=
      (scrollPosition.current * viewport.width - gridRef.current.position.x) *
      0.1;

    const worldPositions = new THREE.Vector3();
    // Managing the infinite scrolling by moving planes when they're out of screen
    gridRef.current.children.forEach((plane) => {
      // Get plane's WORLD position (not local to group)
      const planeWorldPosition = plane.getWorldPosition(worldPositions);

      // Right-side wrapping
      if (
        planeWorldPosition.x <
        -viewport.width / 2 - gridDimensions.coordinates[0].width / 2
      ) {
        plane.position.x +=
          gridDimensions.totalWidth + gridDimensions.adjustedGapX; // Teleport left
      }
      // Left-side wrapping
      else if (
        planeWorldPosition.x >
        viewport.width / 2 + gridDimensions.coordinates[0].width / 2
      ) {
        plane.position.x -=
          gridDimensions.totalWidth + gridDimensions.adjustedGapX; // Teleport left
      }
    });
  });

  return (
    <group ref={gridRef} args={[]}>
      {gridDimensions.coordinates.map(
        ({ key, idx, x, y, width, height, url }) => (
          <Photo
            key={key}
            idx={idx}
            x={x}
            y={y}
            width={width}
            height={height}
            momentum={momentum}
            url={url}
          />
        )
      )}
    </group>
  );
};

export const MotoyoshiInfiniteGrid = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <Grid />
    </Canvas>
  );
};
