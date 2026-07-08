export default function Skeleton({ width = "100%", height = "20px" }) {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor: "#e0e0e0",
                borderRadius: "8px",
                animation: "pulse 1.5s infinite",
            }}
        />
    );
}