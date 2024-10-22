// /* eslint-disable react/react-in-jsx-scope */
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import Courses from "../../Page/Courses/Courses";
 

// const Cart = () => {
//     const [selectedCourse,setSelectedCourse] =useState()


//   const handleRemoveFromCart = (id) => {
//     setSelectedCourse(selectedCourse?.filter(course => course.id !== id));
//   };

//   const getTotalPrice = () => {
//     return selectedCourse?.reduce((acc, course) => acc + (course.discount_price * course.quantity), 0);
//   };
//   console.log('selectedCourse',setSelectedCourse)
//   return (
//     <div className="m-mt_16px">
//       <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">Cart</h1>
//       <div className="pt-p_16px">
//         <div className="lg:flex items-start gap-3">
//           <div className="w-full lg:w-[58%] bg-white border-2">
//             <table className="overflow-x-auto w-full">
//               <thead>
//                 <tr className="border-b-4 border-gray-300">
//                   <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
//                   <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
//                   <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
//                   <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedCourse?.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center p-4">
//                       Your cart is empty.
//                     </td>
//                   </tr>
//                 ) : (
//                   selectedCourse?.map((course) => (
//                     <tr key={course.id} className="border-b border-gray-300">
//                       <td>
//                         <div className="flex items-center justify-center">
//                           <div className="w-[20%] text-center flex items-center justify-center">
//                             <RiDeleteBin5Line
//                               className="text-xl hover:text-footer_color cursor-pointer"
//                               onClick={() => handleRemoveFromCart(course.id)}
//                             />
//                           </div>
//                           <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
//                             <img className="h-[40px] w-[70px]" src={course.photo} alt="Course" />
//                             <p className="text-[14.4px] px-[7px] text-center">
//                               {course.course_name}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
//                           Tk {course.discount_price}
//                         </p>
//                       </td>
//                       <td>
//                         <div className="text-center">{course.quantity}</div>
//                       </td>
//                       <td>
//                         <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
//                           Tk {course.discount_price * course.quantity}
//                         </p>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="lg:w-[41%] bg-white border-2">
//             <div className="px-[30px]">
//               <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
//                 Cart Summary
//               </h2>
//               <div className="py-3 flex justify-between border-b border-gray-300">
//                 <p className="text-black font-bold">Total Price</p>
//                 <p className="text-black font-bold">Tk {getTotalPrice()}</p>
//               </div>
//               <Link
//                 to={`/cart/checkout`}
//                 className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
//               >
//                 PROCEED TO CHECKOUT
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Courses selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}  />

//     </div>
//   );
// };

// export default Cart;
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import Courses from "../../Page/Courses/Courses";
import { Link } from "react-router-dom";
const Cart = () => {
  const [selectedCourse, setSelectedCourse] = useState([]);

  // Load the selected courses from localStorage when the Cart page mounts
  useEffect(() => {
    const savedCourses = localStorage.getItem("selectedCourses");
    if (savedCourses) {
      setSelectedCourse(JSON.parse(savedCourses));
    }
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCourses = selectedCourse.filter((course) => course.id !== id);
    setSelectedCourse(updatedCourses);
    localStorage.setItem("selectedCourses", JSON.stringify(updatedCourses));
  };

  const getTotalPrice = () => {
    return selectedCourse.reduce((acc, course) => acc + course.discount_price * course.quantity, 0);
  };

  return (
    <div className="m-mt_16px">
      <Courses
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}  
      />
      
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">Cart</h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className="overflow-x-auto w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  selectedCourse.map((course) => (
                    <tr key={course.id} className="border-b border-gray-300">
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-[20%] text-center flex items-center justify-center">
                            <RiDeleteBin5Line
                              className="text-xl hover:text-footer_color cursor-pointer"
                              onClick={() => handleRemoveFromCart(course.id)}
                            />
                          </div>
                          <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                            <img className="h-[40px] w-[70px]" src={course.photo} alt="Course" />
                            <p className="text-[14.4px] px-[7px] text-center">
                              {course.course_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                          Tk {course.discount_price}
                        </p>
                      </td>
                      <td>
                        <div className="text-center">{course.quantity}</div>
                      </td>
                      <td>
                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                          Tk {course.discount_price * course.quantity}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[41%] bg-white border-2">
            <div className="px-[30px]">
              <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                Cart Summary
              </h2>
              <div className="py-3 flex justify-between border-b border-gray-300">
                <p className="text-black font-bold">Total Price</p>
                <p className="text-black font-bold">Tk {getTotalPrice()}</p>
              </div>
              <Link
                to={`/cart/checkout`}
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

