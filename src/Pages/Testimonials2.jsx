import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReview,
  fetchAllReviews,
  updateReviewById,
} from "../Redux/TestimonialSlice";
import { Star, Edit, X, User } from "lucide-react";
import styled, { keyframes } from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ReviewList = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 1rem;

  @media (max-width: 640px) {
    overflow-x: auto;
    scroll-smooth: true;
  }

  @media (min-width: 640px) {
    overflow-x: visible;
    flex-wrap: wrap;
  }
`;
// this is the card
const ReviewCard = styled.div`
  display: flex;
  gap: 2rem;
  background-color: #ededed;
  padding: 2rem;
  border-radius: 1rem;
  color: #292929;
  // height:380px;
  // width: 580px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 250px;
  }
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e7eb;
  border-radius: 50%;
`;

const Content = styled.div`
  flex: 1;
  gap: 4px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
`;

const UserName = styled.div`
  font-weight: 600;
`;

const Date = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ReviewText = styled.p`
  color: #374151;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.375rem;
  width: 100%;
  max-width: 500px;
  position: relative;

  @media (max-width: 640px) {
    max-width: 90%;
    margin: 0.5rem;
    padding: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
`;

const StarRatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#FFD700" : "#D1D5DB")};

  &:hover {
    color: #ffd700;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.5;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const moveLeftAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const moveRightAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const CardsRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
  gap: 1rem; // Add a consistent gap between cards
`;

const InnerRowLeft = styled.div`
  display: flex;
  animation: ${moveLeftAnimation} 40s linear infinite;
  gap: 1rem; // Add the same gap here
`;

const InnerRowRight = styled.div`
  display: flex;
  animation: ${moveRightAnimation} 40s linear infinite;
  gap: 1rem; // Add the same gap here
`;

const Testimonials = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.testimonials);
  const user = useSelector((state) => state.auth.user);
  const property = useSelector((state) => state.property.property);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isEditReviewModalOpen, setIsEditReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const reviewTextRef = useRef(null);
  const rowLeftRef = useRef(null);
  const rowRightRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllReviews()).then((action) => {
      setLocalReviews(action.payload || []);
    });
  }, [dispatch]);

  const handleAddReview = async () => {
    const message = reviewTextRef.current?.value;
    if (!message?.trim() || rating === 0) {
      alert("Please provide both a rating and a review message");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        property_id: property?.id,
        user_id: user?.user_id,
        user_name: user?.name || "Anonymous User", // Default to "Anonymous User" if not available
        user_email: user?.email,
        message: message.trim(),
        rating: rating,
      };

      // Optimistic update
      setLocalReviews((prev) => [reviewData, ...prev]);

      // Add to backend
      await dispatch(addReview(reviewData));

      // Reset form and close modal
      setRating(0);
      setIsAddReviewModalOpen(false);

      // Fetch latest reviews in background
      dispatch(fetchAllReviews()).then((action) => {
        setLocalReviews(action.payload || []);
      });
    } catch (error) {
      console.error("Failed to add review:", error);
      alert("Failed to add review. Please try again.");
      // Revert optimistic update on error
      dispatch(fetchAllReviews()).then((action) => {
        setLocalReviews(action.payload || []);
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateReview = (updatedReview) => {
    setLocalReviews((prev) =>
      prev.map((review) =>
        review.id === updatedReview.id
          ? {
              ...review,
              message: updatedReview.message,
              rating: updatedReview.rating,
              user_name: review.user_name, // Retain user_name
            }
          : review
      )
    );

    const updatedData = {
      ...updatedReview,
      user_name: localReviews.find((review) => review.id === updatedReview.id)
        ?.user_name,
    };

    dispatch(updateReviewById({ id: updatedReview.id, updatedData })).then(
      () => {
        dispatch(fetchAllReviews()).then((action) => {
          setLocalReviews(action.payload || []);
        });
      }
    );

    setIsEditReviewModalOpen(false);
    setEditingReview(null);
  };

  const StarRating = ({ rating, onRatingChange }) => (
    <StarRatingContainer>
      {[...Array(5)].map((_, index) => (
        <StarButton
          key={index}
          type="button"
          isActive={index < rating}
          onClick={() => onRatingChange(index + 1)}
        >
          <Star
            className="w-6 h-6"
            fill={index < rating ? "currentColor" : "none"}
          />
        </StarButton>
      ))}
    </StarRatingContainer>
  );

  const EditReviewModal = () => (
    <Modal>
      <ModalContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Edit Review</h3>
          <button
            onClick={() => setIsEditReviewModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <TextArea
            ref={reviewTextRef}
            placeholder="Edit your review..."
            maxLength={500}
            defaultValue={editingReview?.message || ""}
          />
        </div>

        <Button
          onClick={() =>
            handleUpdateReview({
              id: editingReview.id,
              rating,
              message: reviewTextRef.current.value,
            })
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Review"}
        </Button>
      </ModalContent>
    </Modal>
  );

  useEffect(() => {
    const handleMouseEnter = (ref) => () => {
      if (ref.current) {
        ref.current.style.animationPlayState = "paused";
      }
    };

    const handleMouseLeave = (ref) => () => {
      if (ref.current) {
        ref.current.style.animationPlayState = "running";
      }
    };

    const rowLeft = rowLeftRef.current;
    const rowRight = rowRightRef.current;

    if (rowLeft) {
      rowLeft.addEventListener("mouseenter", handleMouseEnter(rowLeftRef));
      rowLeft.addEventListener("mouseleave", handleMouseLeave(rowLeftRef));
    }

    if (rowRight) {
      rowRight.addEventListener("mouseenter", handleMouseEnter(rowRightRef));
      rowRight.addEventListener("mouseleave", handleMouseLeave(rowRightRef));
    }

    return () => {
      if (rowLeft) {
        rowLeft.removeEventListener("mouseenter", handleMouseEnter(rowLeftRef));
        rowLeft.removeEventListener("mouseleave", handleMouseLeave(rowLeftRef));
      }
      if (rowRight) {
        rowRight.removeEventListener(
          "mouseenter",
          handleMouseEnter(rowRightRef)
        );
        rowRight.removeEventListener(
          "mouseleave",
          handleMouseLeave(rowRightRef)
        );
      }
    };
  }, []);

  const renderCards = (cards) => {
    const duplicatedCards = [...cards, ...cards, ...cards]; // Duplicate cards 3 times
    return duplicatedCards.map((review, index) => (
      <ReviewCard key={`${review.id || index}-${index}`}>
        <Avatar>
          <User size={40} color="white" />
        </Avatar>
        <Content>
          <UserName>{review.user_name || "Anonymous User"}</UserName>
          <Date>{review.date}</Date>
          <StarRating rating={review.rating} onRatingChange={() => {}} />
          <ReviewText>{review.message}</ReviewText>
          {user?.user_id === review.user_id && (
            <button
              onClick={() => {
                setEditingReview(review);
                setIsEditReviewModalOpen(true);
                setRating(review.rating);
              }}
              className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          )}
        </Content>
      </ReviewCard>
    ));
  };

  const renderRows = () => {
    if (!localReviews || localReviews.length === 0) {
      return <p>No reviews available.</p>;
    }

    const middleIndex = Math.ceil(localReviews.length / 2);
    const topRowCards = localReviews.slice(0, middleIndex);
    const bottomRowCards = localReviews.slice(middleIndex);

    return (
      <>
        <CardsRow>
          <InnerRowLeft ref={rowLeftRef}>
            {renderCards(topRowCards)}
          </InnerRowLeft>
        </CardsRow>
        <CardsRow>
          <InnerRowRight ref={rowRightRef}>
            {renderCards(bottomRowCards)}
          </InnerRowRight>
        </CardsRow>
      </>
    );
  };

  return (
    <Container>
      <Header>
        {/* <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-5xl font-semibold text-[#292929]">4.88</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-[#292929]">
          Guest favourite
        </h2>
        <p className="text-gray-600 max-w-md mx-auto ">
          One of the most loved homes on Airbnb based on ratings, reviews, and
          reliability.
        </p> */}
        <p className="w-full text-center text-sm text-[#292929]">
          WHAT OUR CLIENTS HAVE TO SAY
        </p>
        <h1 className="w-full text-center text-5xl font-bold mb-2 text-[#292929]">
          TESTIMONIALS
        </h1>
      </Header>
      {renderRows()}

      <div className="flex gap-4 mt-6">
        <Button onClick={() => setIsModalOpen(true)}>
          Show all {reviews?.length || 0} reviews
        </Button>
        <Button onClick={() => setIsAddReviewModalOpen(true)}>
          Add Review
        </Button>
      </div>

      {/* Review List Modal */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">All Reviews</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid gap-4 max-h-[60vh] overflow-y-auto sm:grid-cols-2 lg:grid-cols-2">
              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div>
                      <div className="font-semibold text-[#292929]">
                        {review.user_name}
                      </div>
                      <div className="text-sm text-gray-600">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={i < review.rating ? "#FFD700" : "none"}
                        stroke={i < review.rating ? "#FFD700" : "currentColor"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.message}</p>
                </div>
              ))}
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* Add Review Modal */}
      {isAddReviewModalOpen && (
        <Modal>
          <ModalContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <button
                onClick={() => setIsAddReviewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <TextArea
                ref={reviewTextRef}
                placeholder="Share your experience..."
                maxLength={500}
              />
            </div>

            <Button onClick={handleAddReview} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </ModalContent>
        </Modal>
      )}

      {/* Edit Review Modal */}
      {isEditReviewModalOpen && <EditReviewModal />}
    </Container>
  );
};

export default Testimonials;
