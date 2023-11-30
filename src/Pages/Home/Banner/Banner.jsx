import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div>
          <div className=" absolute lg:mt-[400px] md:mt-[150px] mt-[70px] lg:ml-[600px] md:ml-[400px] ml-[210px]">
            <h2 className=" lg:text-7xl md:text-5xl text-2xl font-bold text-blue-600 mb-5">
              Trusted <br /> Commercial <br /> Finance Broker.
            </h2>
            <Link to={"/adminPage"}>
              {" "}
              <button className="btn btn-primary btn-sm">Join as HR/Admin</button>
            </Link>
          </div>
          <img src="https://i.ibb.co/Kj0nh8z/hands-table-during-business-meeting.jpg" />
        </div>
        <div>
          <div className=" absolute lg:mt-[400px] md:mt-[150px] mt-[70px] lg:ml-[600px] md:ml-[400px] ml-[210px]">
            <h2 className=" lg:text-7xl md:text-5xl text-2xl font-bold text-blue-600 mb-5">
              provides <br /> professional <br /> services
            </h2>
            <Link to={"/employeePage"}>
              {" "}
              <button className="btn btn-primary btn-sm">Join as an Employee</button>
            </Link>
          </div>
          <img src="https://i.ibb.co/QcsPxts/business-people-working-with-ipad-high-angle.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
