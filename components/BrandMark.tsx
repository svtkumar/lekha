export default function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle className="drop" cx="13" cy="2" r="1.6" />
      <polygon
        points="13,7 25,22 22,33 4,33 1,22"
        fill="currentColor"
      />
      <polygon
        className="slit"
        points="11,33 15,33 15,16 13,11 11,16"
      />
      <circle cx="13" cy="24" r="1.3" fill="currentColor" />
    </svg>
  );
}
