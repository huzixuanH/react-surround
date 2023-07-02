import { ElementType, Suspense } from "react";
import Loading from "@/components/loading";

/**
 * Suspense Wrapper
 *
 * @param {ElementType} E 懒加载的组件
 * */
export const SuspenseWrapper: React.FC<{ E: ElementType }> = ({ E }) => {
  return (
    <Suspense fallback={<Loading />}>
      <E />
    </Suspense>
  );
};
