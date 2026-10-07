
function SaleCategoryListLoader() {
  return (
    <div className="flex items-center gap-px">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-5 w-12" />
      ))}
    </div>
  );
}

export default SaleCategoryListLoader;
