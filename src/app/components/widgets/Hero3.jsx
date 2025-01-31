import Image from "next/image"
const Hero3 = () => {
    return (
        <div className="relative flex flex-col min-h-[70VH] items-center justify-center w-full bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/30" style={{ backgroundImage: 'url(/hero_image_3.jpg)' }}>
            <div className="mt-10 w-[300px] md:w-[700px] text-center">
                <h1 className="text-center font-bold text-5xl text-white ">
                    MAROC Network RCC Node
                </h1>
                <h2 className="text-center mt-4 text-white ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat odio id modi, adipisci debitis quae ab consectetur mollitia. Fugit labore aliquid nihil adipisci eaque dolor odit velit consectetur enim facere.
                </h2>
            </div>
            <div className="text-center">
                {/* <button className="mt-4 bg-[#6D5DDD] text-white p-2 rounded-xl shadow-black shadow-sm hover:scale-105 duration-300 transition-transform">
                    Explore Now
                </button> */}
            </div>
        </div>
    )
}

export default Hero3