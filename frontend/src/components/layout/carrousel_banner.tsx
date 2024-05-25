import { getAllBanner } from "@/lib/backend/banner";
import BannerItem from "../banner/card";

export default async function CarrouselBanner() {
  const { result, total } = await getAllBanner();

  return <div>{total > 0 && <BannerItem item={result} />}</div>;
}
