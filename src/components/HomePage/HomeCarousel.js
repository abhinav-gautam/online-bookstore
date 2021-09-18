import carouselImage1 from '../../media/carouselImage1.png';
import carouselImage2 from '../../media/carouselImage2.png';
import carouselImage3 from '../../media/carouselImage3.png';
import carouselImage4 from '../../media/carouselImage4.png';

const HomeCarousel = () => {
    return (
        <div className="display-500-none mt-4">
            <div className="carousel slide carousel-fade" data-bs-ride="carousel" id="cr">

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button data-bs-target="#cr" data-bs-slide-to="0" className="active"></button>
                    <button data-bs-target="#cr" data-bs-slide-to="1"></button>
                    <button data-bs-target="#cr" data-bs-slide-to="2"></button>
                    <button data-bs-target="#cr" data-bs-slide-to="3"></button>
                </div>

                {/* Carousel Content */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={carouselImage1} alt="" className="w-100" height="600px" />

                    </div>
                    <div className="carousel-item">
                        <img src={carouselImage2} alt="" className="w-100" height="600px" />

                    </div>
                    <div className="carousel-item">
                        <img src={carouselImage3} alt="" className="w-100" height="600px" />

                    </div>
                    <div className="carousel-item">
                        <img src={carouselImage4} alt="" className="w-100" height="600px" />

                    </div>

                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" data-bs-target="#cr" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" data-bs-target="#cr" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    );
}

export default HomeCarousel;
