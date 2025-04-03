import React from "react";
import heroImage from "./hero-4e005342.png"; // المسار الصحيح للصورة

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3" style={{ marginTop: "60px" }}>
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src={heroImage} // استخدام الصورة المستوردة
            alt="Card"
            style={{ 
              width: "100%", // عرض الصورة 100% من العنصر الأب
              height: "auto", // الارتفاع يتكيف تلقائيًا مع العرض
              objectFit: "cover", // الحفاظ على نسبة العرض إلى الارتفاع
              maxHeight: "500px", // أقصى ارتفاع للصورة
            }}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text-white fw-lighter">New Season Arrivals</h5>
              <p className="card-text fs-5 text-white d-none d-sm-block ">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;