import ProductSlider from "@/components/store/home/productSlider";
import SoloGan from "@/components/store/home/sologan";

export default function Home() {
  return (
    <div className="sm:px-32 px-6 py-6 h-screen">
      <div className="py-1">
        <SoloGan />
      </div>
      <div className="py-2 pb-4">
        <ProductSlider
          data={[]}
          pageNo={0}
          pageSize={0}
          totalElements={0}
          totalPages={0}
          isLast={false}
        />
      </div>
    </div>
  );
}
