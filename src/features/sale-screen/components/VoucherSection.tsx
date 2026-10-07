import PlaceOrderBtn from "./PlaceOrderBtn";
import VoucherOrderList from "./VoucherOrderList";
import VoucherSummary from "./VoucherSummary";

function VoucherSection() {
  return (
    <div className=" flex flex-col gap-4">
      <VoucherOrderList />
      <VoucherSummary />
      <PlaceOrderBtn />
    </div>
  );
}

export default VoucherSection;
