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
  // console.log(phones.length);
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
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;

    // 4 append child
    cards.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle show details function
const handleShowDetails = async (id) => {
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  showPhoneDetails(phoneDetails);
};

// showPhoneDetails
const showPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);

  // get show details container
  const showDetailsContainer = document.getElementById("showDetailsContainer");

  showDetailsContainer.innerHTML = `
    <img class="w-2/4 p-4 mb-4 mx-auto" src="${phoneDetails.image}" alt="">
    <h3 class="font-bold text-lg">${phoneDetails.name}</h3>

    <p><span class="font-bold">Storage:</span> ${
      phoneDetails.mainFeatures.storage
    }</p>

    <p><span class="font-bold">Display Size:</span> ${
      phoneDetails.mainFeatures.displaySize
    }</p>

    <p><span class="font-bold">Chipset:</span> ${
      phoneDetails.mainFeatures.chipSet
    }</p>

    <p><span class="font-bold">Memory:</span> ${
      phoneDetails.mainFeatures.memory
    }</p>

    <p><span class="font-bold">Slug:</span> ${phoneDetails.slug}</p>

    <p><span class="font-bold">Release data:</span> ${
      phoneDetails.releaseDate
    }</p>

    <p><span class="font-bold">Brand:</span> ${phoneDetails.brand}</p>

    <p><span class="font-bold">GPS:</span> ${
      phoneDetails?.others?.GPS || "no GPS available"
    }</p>

    // ternary operator
    <p><span class="font-bold">GPS:</span> ${
      phoneDetails?.others?.GPS ? phoneDetails?.others?.GPS : "no GPS available"
    }</p>
  `;
  phone_details_modal.showModal();
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
