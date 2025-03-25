/**
 * State Machine using TypeScript Types
 */

// Define all possible states
type OrderStatus = "created" | "paid" | "shipped" | "delivered" | "cancelled";

// Define allowed transitions from each state
type OrderTransitions = {
  created: "paid" | "cancelled";
  paid: "shipped" | "cancelled";
  shipped: "delivered" | "cancelled";
  delivered: never; // Terminal state
  cancelled: never; // Terminal state
};

// Main function that enforces valid transitions
function transitionOrder<S extends OrderStatus>(
  currentStatus: S,
  newStatus: OrderTransitions[S],
): OrderStatus {
  console.log(`Transitioning from ${currentStatus} to ${newStatus}`);
  return newStatus;
}

/**
 * Test with a literal
 */

transitionOrder("created", "paid");
transitionOrder("created", "cancelled");
transitionOrder("paid", "shipped");
transitionOrder("paid", "cancelled");
transitionOrder("shipped", "delivered");
transitionOrder("shipped", "cancelled");

// @ts-expect-error The type is never
transitionOrder("created", "delivered");
// @ts-expect-error The type is never
transitionOrder("delivered", "cancelled");
// @ts-expect-error The type is never
transitionOrder("cancelled", "cancelled");

/**
 * Test with a variable
 */

const myState = "created";
// @ts-expect-error The type is never
transitionOrder(myState, "delivered");
