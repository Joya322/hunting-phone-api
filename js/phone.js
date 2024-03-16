// load phones function
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// display phone function
const displayPhones = (phones, isShowAll) => {
  // 1 get cards container
  const cards = document.getElementById("cards");

  // clear cards div
  cards.textContent = "";

  // show limited phones
  console.log(phones.length);
  //get show all button
  const showAllBtn = document.getElementById("show-details");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  // console.log(phones.length);
  phones.forEach((phone) => {
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card pt-4 bg-gray-100 shadow-xl`;

    //3 set innerHTML
    phoneCard.innerHTML = `
            <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
    `;

    // 4 append child
    cards.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  // show loading Spinner
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
  // console.log(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};
