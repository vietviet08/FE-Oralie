export default function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2 justify-between items-start overflow-x-auto">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="flex justify-start items-center gap-2">{children}</div>
        </div>
    );
}