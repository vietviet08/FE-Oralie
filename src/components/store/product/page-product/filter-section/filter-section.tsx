export default function FilterSection({ title, children, className }: { title: string; children: React.ReactNode ; className?: string }) {
    return (
        <div className="flex flex-col gap-2 justify-between items-start overflow-x-auto">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className={className}>{children}</div>
        </div>
    );
}