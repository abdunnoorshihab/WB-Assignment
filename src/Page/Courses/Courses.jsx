import { useEffect, useState } from "react";

const URL = `https://itder.com/api/get-course-list`;

const Courses = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      const json = await result.json();
      setDatas(json.courseData);
    };

    fetchData();
  }, []);

  return (
    <div className="m-mt_16px">
      {/* <h2>Hello {datas.length}</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {datas.map((m) => (
          <div
            key={m.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img src={m.photo} alt={m.name} />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">{m.id}</h3>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {m.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">★★★★★</span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {m.trainer_data?.name}
                </span>
              </div>
              <p className="text-gray-600 text-md mb-4">
                {m.courseDetails}{" "}
                <span className="text-blue-500">Show Details</span>
              </p>
              <hr />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    Tk {m.regular_price}
                  </span>
                  <span className="text-green-600 text-md font-bold ml-2">
                    -
                    {Math.round(
                      ((m.regular_price - m.discount_price) / m.regular_price) *
                        100
                    )}
                    %
                  </span>
                  <span className="text-black text-lg font-bold ml-2">
                    Tk {m.discount_price}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
