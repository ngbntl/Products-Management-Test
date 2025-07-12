import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        className="mb-4"
        onClick={() => (window.location.href = "/products")}
      >
        Quản lý Sản Phẩm
      </Button>
    </div>
  );
};

export default Home;
