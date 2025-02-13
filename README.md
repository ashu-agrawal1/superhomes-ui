<div className="w-full lg:w-[200px]">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total</span>
                        <span className="font-medium">
                          ₹{(() => {
                            const basePrice = property.price || 0
                            const startDate = new Date(newAvailability.start_date)
                            const endDate = new Date(newAvailability.end_date)
                            const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
                            const totalPrice = basePrice * numberOfNights
                            const withPlatformFee = totalPrice * 1.15
                            const extraGuestCharges =
                              numberOfGuests > property.max_guests
                                ? (numberOfGuests - property.max_guests) * 500 * numberOfNights
                                : 0
                            return (withPlatformFee + extraGuestCharges).toFixed(2)
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>