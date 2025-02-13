import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllReviews } from "../Redux/TestimonialSlice"  
import { User } from 'lucide-react'
import styled, { keyframes } from "styled-components"
import "../css/font.css"

const moveLeftAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const moveRightAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`

const TestimonialCard = styled.div`
  width: 300px;
  background: #3b82f6;
  color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  flex: 0 0 auto;
  margin: 0 1rem;

  .message {
    font-size: 0.875rem;
    font-style: italic;
    max-height: 100px;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    width: 250px;
    padding: 0.8rem;
  }
`

const CardsRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin: 2rem 0;

  &:hover {
    animation-play-state: paused;
  }
`

const InnerRowLeft = styled.div`
  display: flex;
  animation: ${moveLeftAnimation} 40s linear infinite; // Slowed down to 60s
`

const InnerRowRight = styled.div`
  display: flex;
  animation: ${moveRightAnimation} 40s linear infinite; // Slowed down to 60s
`

const TestimonialsSection = () => {
  const dispatch = useDispatch()
  const { reviews, status } = useSelector((state) => state.testimonials)
  const rowLeftRef = useRef(null)
  const rowRightRef = useRef(null)

  useEffect(() => {
    dispatch(fetchAllReviews())
  }, [dispatch])

  useEffect(() => {
    const handleMouseEnter = (ref) => () => {
      if (ref.current) {
        ref.current.style.animationPlayState = "paused"
      }
    }

    const handleMouseLeave = (ref) => () => {
      if (ref.current) {
        ref.current.style.animationPlayState = "running"
      }
    }

    const rowLeft = rowLeftRef.current
    const rowRight = rowRightRef.current

    if (rowLeft) {
      rowLeft.addEventListener("mouseenter", handleMouseEnter(rowLeftRef))
      rowLeft.addEventListener("mouseleave", handleMouseLeave(rowLeftRef))
    }

    if (rowRight) {
      rowRight.addEventListener("mouseenter", handleMouseEnter(rowRightRef))
      rowRight.addEventListener("mouseleave", handleMouseLeave(rowRightRef))
    }

    return () => {
      if (rowLeft) {
        rowLeft.removeEventListener("mouseenter", handleMouseEnter(rowLeftRef))
        rowLeft.removeEventListener("mouseleave", handleMouseLeave(rowLeftRef))
      }
      if (rowRight) {
        rowRight.removeEventListener("mouseenter", handleMouseEnter(rowRightRef))
        rowRight.removeEventListener("mouseleave", handleMouseLeave(rowRightRef))
      }
    }
  }, [])

  const renderCards = (cards) => {
    return cards.map((testimonial, index) => (
      <TestimonialCard key={index} style={{ transform: `scale(${1 + Math.sin(index * 0.5) * 0.1})` }}>
        <User
          size={40}
          color="white"
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: "50%",
            padding: "0.5rem",
          }}
        />
        <p className="message">
          <span className="text-2xl">{testimonial.message}</span>
        </p>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>{testimonial.user_name}</h3>
        <p style={{ fontSize: "0.875rem" }}>{testimonial.user_position}</p>
      </TestimonialCard>
    ))
  }

  const renderRows = () => {
    if (status === "loading" || !reviews) {
      return <p>Loading reviews...</p>
    }

    const middleIndex = Math.ceil(reviews.length / 2)
    const topRowCards = reviews.slice(0, middleIndex)
    const bottomRowCards = reviews.slice(middleIndex)

    return (
      <>
        <CardsRow>
          <InnerRowLeft ref={rowLeftRef}>
            {renderCards(topRowCards)}
            {renderCards(topRowCards)}
          </InnerRowLeft>
        </CardsRow>
        <CardsRow>
          <InnerRowRight ref={rowRightRef}>
            {renderCards(bottomRowCards)}
            {renderCards(bottomRowCards)}
          </InnerRowRight>
        </CardsRow>
      </>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-auto md:min-h-screen p-4 md:p-8">

      <div className="flex flex-col items-center justify-center mb-8">
        <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-500 text-3xl md:text-6xl font-semibold">
          OUR
        </span>
        <span className="text-4xl md:text-8xl font-bold text-gray-800">TESTIMONIALS</span>
      </div>

      {renderRows()}
    </div>
  )
}

export default TestimonialsSection
