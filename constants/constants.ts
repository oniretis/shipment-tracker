let BestCuisine = ["Received", "In Progress", "Completed"]; // Default value

async function fetchCuisineStatus() {
  try {
    const response = await fetch(
      "https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data && data.message && data.message.length > 0) {
      BestCuisine = data.message.map((item) => item.status) || BestCuisine;
    }
  } catch (error) {
    console.error("Error fetching status:", error);
  }
}

fetchCuisineStatus();

export const Cuisines = new Array(20).fill(null).map((_, i) => ({
  id: i,

  name: BestCuisine[i % BestCuisine.length],
  selected: false,
}));

export const ACTIVE_COLOR = "#2F50C1";
export const INACTIVE_COLOR = "#525252";
export const BACKGROUND_COLOR = "#F4F2F8";
