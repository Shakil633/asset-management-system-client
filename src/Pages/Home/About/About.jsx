import { FaFlag, FaHourglassEnd, FaLeaf } from "react-icons/fa";

const About = () => {
  return (
    <div className="px-5 mt-16">
        <h2 className=" lg:text-5xl md:text-5xl text-xl font-bold mb-6">About section:</h2>
      <h2 className=" lg:text-5xl md:text-5xl text-xl font-semibold ">Putting our clients first since 1986</h2>
      <p className=" py-5 lg:text-2xl md:text-2xl text-xl text-[#a29b9c]">
        For more than 30 years, we’ve been empowering clients by <br /> helping them
        take control of their financial lives.
      </p>

      <div className=" lg:flex md:flex flex-col mt-5 mb-10">
        <div className=" flex gap-3">
          <div className="">
            <div className="bg-[#c89b42] p-4 rounded-lg">
              <FaLeaf className=" w-[30px] h-[20px] text-white " />
            </div>
          </div>
          <div>
            <h2 className=" text-2xl font-bold mb-5">Philosophy</h2>
            <p className=" text-[#676768]">
              At vero eos etme accusamus iusto odio ent dignissimos deleniti
              atque corrupti quos ducimus moll quilla blanditiis expedita est
              distinctio.
            </p>
          </div>
        </div>
        <div className=" flex gap-3">
          <div className="">
            <div className="bg-[#c89b42] p-4 rounded-lg">
              <FaHourglassEnd  className=" w-[30px] h-[20px] text-white " />
            </div>
          </div>
          <div>
            <h2 className=" text-2xl font-bold mb-5">History</h2>
            <p className=" text-[#676768]">
              At vero eos etme accusamus iusto odio ent dignissimos deleniti
              atque corrupti quos ducimus moll quilla blanditiis expedita est
              distinctio.
            </p>
          </div>
        </div>
        <div className=" flex gap-3">
          <div className="">
            <div className="bg-[#c89b42] p-4 rounded-lg">
              <FaFlag className=" w-[30px] h-[20px] text-white " />
            </div>
          </div>
          <div>
            <h2 className=" text-2xl font-bold mb-5">Culture</h2>
            <p className=" text-[#676768]">
              At vero eos etme accusamus iusto odio ent dignissimos deleniti
              atque corrupti quos ducimus moll quilla blanditiis expedita est
              distinctio.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
