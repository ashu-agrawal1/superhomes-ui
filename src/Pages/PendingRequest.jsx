import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Check, X, ChevronRight, FileText, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react'
import { getAllHostRequests, approveHostRequest, rejectHostRequest } from './hostRequestsSlice'

export default function PendingRequests() {
  const dispatch = useDispatch()
  const { requests, loading } = useSelector((state) => state.hostRequests)

  useEffect(() => {
    dispatch(getAllHostRequests())
  }, [dispatch])

  const handleApprove = (requestId) => {
    dispatch(approveHostRequest(requestId))
  }

  const handleReject = (requestId) => {
    dispatch(rejectHostRequest(requestId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pending Host Requests</h1>
      
      <div className="flex space-x-2 mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Pending</button>
        <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg">Approved</button>
        <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg">Rejected</button>
      </div>

      <div className="space-y-6">
        {requests.filter(req => req.status === 'pending').map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16">
                    <img
                      src={request.profileImage || "/placeholder.svg"}
                      alt={request.fullName}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{request.fullName}</h2>
                    <p className="text-gray-500">{request.email}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending Review
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>Submitted on {new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FileText className="h-5 w-5" />
                    <span>Phone: {request.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CreditCard className="h-5 w-5" />
                    <span>Location: {request.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-2">Documents</h3>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => window.open(request.governmentId)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      <span>View ID</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => window.open(request.bankDetails)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Bank Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => handleReject(request.id)}
                  className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <X className="h-5 w-5 mr-2" />
                  Reject Request
                </button>
                <button
                  onClick={() => handleApprove(request.id)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Approve Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
