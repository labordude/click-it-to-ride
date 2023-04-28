addEventListener("DOMContentLoaded", () => {
  /** ********DELIVERABLES START*****************/
  /** Project Pitch
   * HTML/CSS/JS
   * Public API - imagin.studio
   * Private API - db.json via json-server
   * Single-page app
   * Event listeners (click, submit, scroll,change,DOMContentLoaded)
   * Array methods [.map(), .filter(), forEach, for loops]
   * GitHub repo: https://github.com/kaytayyy/click-it-to-ride
   * README: https://github.com/kaytayyy/click-it-to-ride/blob/main/README.md
   *
   *
   *
   * User stories:
   * I need a car...I want to sell my car
   * CITR can help. Search vehicles available or add your own listing for management
   */
  /** ********DELIVERABLES END*******************/

  // CAR constructor
  class Car {
    constructor(
      car_make,
      car_model,
      car_model_year,
      color,
      mileage,
      price,
      transmission,
      fuel_type,
      condition,
      id,
      user_image_url,
      image,
    ) {
      // console.log("car factory start");
      this.car_make = car_make;
      this.car_model = car_model;
      this.car_model_year = car_model_year;
      this.color = color;
      this.mileage = mileage;
      this.price = price;
      this.transmission = transmission;
      this.fuel_type = fuel_type;
      this.condition = condition;
      this.id = id;
      this.user_image_url = user_image_url;
      this.image = image;
      // console.log("car factory end");

      this.deleteListing = () => console.log(this);
    }
    // getters

    get carYear() {
      // console.log(this.car_model_year);
      return this.car_model_year;
    }

    get carMake() {
      // console.log(this.car_make);
      return this.car_make;
    }

    get carModel() {
      // console.log(this.car_model);
      return this.car_model;
    }

    get carColor() {
      // console.log(this.color);
      return this.color;
    }

    get carMileage() {
      // console.log(this.mileage);
      return this.mileage;
    }

    get carPrice() {
      // console.log(this.price);
      return this.price;
    }

    get carTransmission() {
      // console.log(this.transmission);
      return this.transmission;
    }

    get carFuelType() {
      // console.log(this.fuel_type);
      return this.fuel_type;
    }

    get carCondition() {
      // console.log(this.condition);
      return this.condition;
    }

    get carID() {
      // console.log(this.carID);
      return this.id;
    }

    get userImage() {
      // console.log(this.user_image_url);
      return this.user_image_url;
    }

    get apiImage() {
      // console.log(this.apiImage);
      return this.image;
    }

    get yearMakeModel() {
      return `${this.car_model_year} ${this.car_make} ${this.car_model}`;
    }

    // setters
    set carYear(year) {
      this.year = year;
    }

    set carMake(make) {
      this.car_make = make;
    }

    set carModel(model) {
      this.car_model = model;
    }

    set carColor(color) {
      this.color = color;
    }

    set carMileage(mileage) {
      this.mileage = mileage;
    }

    set carPrice(price) {
      this.price = price;
    }

    set carTransmission(transmission) {
      this.transmission = transmission;
    }

    set carFuelType(fuel_type) {
      this.fuel_type = fuel_type;
    }

    set carCondition(condition) {
      this.condition = condition;
    }

    set carID(id) {
      this.id = id;
    }

    set userImage(user_image_url) {
      this.user_image_url = user_image_url;
    }

    set apiImage(apiImage) {
      this.image = apiImage;
    }

    allDetails() {
      console.log(
        this.id,
        this.car_model_year,
        this.car_make,
        this.car_model,
        this.mileage,
        this.price,
        this.transmission,
        this.fuel_type,
        this.color,
        this.condition,
        this.user_image_url,
        this.apiImage,
      );
    }

    deleteMe() {
      handleDelete(this);
    }
  }

  /*
   * ********VARIABLE DECLARATION START*********/

  // https://{cdn-instance}.imagin.studio/{api-name}?customer={customer-key}&{query parameters}
  const imaginUrl = `https://cdn.imagin.studio/getImage?customer=${config.apikey}&`;
  const carsUrl = "http://localhost:3000/cars";
  const search = document.querySelector(".search-box");
  const menu = document.querySelector(".navbar");
  const header = document.querySelector("header");
  let currentCar;
  // let currentPage;
  // const carsPerPage = 9;
  const carLot = [];
  let isLoggedIn = false;
  const carsContainer = document.querySelector("#cars-container");
  const saleForm = document.querySelector("#sale-form");
  const updaterForm = document.querySelector("#sale-form-updater");
  /** ********VARIABLE DECLARATION END***********/

  /** ********FETCH REQUESTS START***************/
  // set up for 3rd party image API
  const imagin = {
    image: function getJSON(url) {
      return fetch(url)
        .then(response => {
          if (response.ok) {
            return response; // this API returns an image, it cannot be parsed into JSON
          } else {
            throw response.statusText;
          }
        })
        .catch(error => console.log(error.message));
    },
  };

  // good ol Rover will fetch whatever you need
  const rover = {
    fetch: function getJSON(url) {
      return fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .catch(error => console.log(error.message));
    },

    post: function postJson(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json());
    },
    patch: function patchJson(url, data) {
      return fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json());
    },
    // DELETE URL
    sell: function deleteJSON(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .catch(error => console.log(error.message));
    },
  };
  /** ********FETCH REQUESTS END*****************/
  /** ********SALE FORM************************/

  // to add new listings to our car lot
  saleForm.addEventListener("submit", e => {
    validateForm(e);
    e.preventDefault();
    const sellCar = {
      car_model_year: e.target.year.value,
      car_make: e.target.make.value,
      car_model: e.target.model.value,
      mileage: e.target.mileage.value,
      transmission: e.target.transmission.value,
      color: e.target.color.value,
      price: e.target.price.value,
      condition: e.target.condition.value,
      fuel_type: e.target.fuel_type.value,
      user_image_url: e.target.user_image_url.value,
    };
    function sendListing(sellCar) {
      fetch(carsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellCar),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .then(newCar => renderCarCards(newCar));
    }
    sendListing(sellCar);
    saleForm.reset();
  });

  /** ********EVENT LISTENERS START**************/
  // search icon click
  document.querySelector("#search-icon").addEventListener("click", () => {
    search.classList.toggle("active");
    menu.classList.remove("active");
  });

  // check for changes in the <SELECT> filter elements
  const yearSelector = document.querySelector("#year");
  yearSelector.addEventListener("change", event => {
    filterList(event);
  });
  const makeSelector = document.querySelector("#make");
  makeSelector.addEventListener("change", event => {
    // redo model selector to match only models from selected make
    filterList(event);
  });
  const modelSelector = document.querySelector("#model");
  modelSelector.addEventListener("change", event => {
    filterList(event);
  });
  // menu icon click
  document.querySelector("#menu-icon").addEventListener("click", () => {
    menu.classList.toggle("active");
    search.classList.remove("active");
  });

  // Hide Menu And Search Box On Scroll
  window.addEventListener("scroll", () => {
    menu.classList.remove("active");
    search.classList.remove("active");
  });

  // Header - ensure shadow stays away
  window.addEventListener("scroll", () => {
    header.classList.remove("shadow", window.scrollY > 0);
  });
  // once header gets below the car, make the background white so you can see the text
  document.addEventListener("scroll", () => {
    window.pageYOffset > 640
      ? header.classList.add("bg-white")
      : header.classList.remove("bg-white");
  });

  // look for the search form SUBMIT listener
  search.addEventListener("submit", event => {
    event.preventDefault();
    window.location.href = "#cars";
    handleSearch(event);
  });

  // next page button CLICK listener
  document.querySelector("#next-cars").addEventListener("click", event => {
    rover
      .fetch(`${carsUrl}?_start=${currentCar.id}&_end=${currentCar.id + 9}`)
      .then(cars => {
        garbageCollector(carsContainer);
        const maxResults = cars.length >= 9 ? 9 : cars.length;
        for (let i = 0; i < maxResults; i++) {
          currentCar = cars[i];
          renderCarCards(cars[i]);
        }
      });
  });

  // previous page button CLICK listener
  document.querySelector("#prev-cars").addEventListener("click", event => {
    // this math keeps the button from attempting to access an array index less than 0
    const startAt = currentCar.id - 18 < 0 ? 0 : currentCar.id - 18;
    const endAt = startAt + 9;
    rover.fetch(`${carsUrl}?_end=${endAt}&_start=${startAt}`).then(cars => {
      garbageCollector(carsContainer);
      const maxResults = cars.length >= 9 ? 9 : cars.length;
      for (let i = 0; i < maxResults; i++) {
        currentCar = cars[i];
        renderCarCards(cars[i]);
      }
    });
  });

  // update form SUBMIT listener
  updaterForm.addEventListener("submit", (event, car) => {
    validateForm(event);
    event.preventDefault();
    // rehides the form modal
    document.querySelector("#modal_outer_frame").classList.add("hidden");
    if (event.submitter.id === "cancel-btn") {
      // closes modal without fetch calls
      return false;
    } else {
      handleSave(event, car);
    }
  });

  // image delete button
  const imageDeleteButton = document.querySelector(
    "#sale-form-updater #image_delete_button",
  );
  imageDeleteButton.addEventListener("click", event => {
    document.querySelector("#sale-form-updater #image_url").value = "";
  });

  // clearFilters button
  const clearFiltersButton = document.querySelector(".filters #clearFilters");
  clearFiltersButton.addEventListener("click", () => {
    document.querySelector("#year").value = "";
    document.querySelector("#make").value = "";
    document.querySelector("#model").value = "";
    // after clear go out and get a clean array of cars
    rover.fetch(`${carsUrl}`).then(cars => initialize());
  });

  // login button
  const loginButton = document.querySelector("#login-btn");
  loginButton.addEventListener("click", () => {
    // toggle the value
    isLoggedIn = !isLoggedIn;
    // adjust the button wording to know if user logged in/out
    isLoggedIn ? (loginButton.value = "Logout") : (loginButton.value = "Login");
    document.querySelectorAll(".admin-button-div").forEach(div => {
      div.classList.toggle("hidden");
    });
  });
  /** ********EVENT LISTENERS END****************/

  /** ********FORM PROCESSING START**************/

  function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const formFields = Array.from(form.elements);

    formFields.forEach(field => {
      if (field.checkValidity()) {
        // if invalid add red border class
        field.classList.remove("invalid");
      } else {
        // doesn't match the right pattern
        field.validity.patternMismatch
          ? (document.querySelector(
              `#${field.id}-error`,
            ).textContent += `Entry doesn't match required pattern`)
          : "";

        // number too low for range
        field.validity.rangeUnderflow
          ? (document.querySelector(
              `#${field.id}-error`,
            ).textContent += `This number is below the acceptable range.`)
          : "";

        // step mismatch
        field.validity.tooShort
          ? (document.querySelector(
              `#${field.id}-error`,
            ).textContent += `The entry is not long enough.`)
          : "";

        // too long
        field.validity.tooLong
          ? (document.querySelector(
              `#${field.id}-error`,
            ).textContent += `Entry is too long`)
          : "";

        // invalid type
        field.validity.typeMismatch
          ? (document.querySelector(
              `#${field.id}-error`,
            ).textContent += `Invalid type`)
          : "";
        //   ? ""

        // missing value
        field.validity.valueMissing
          ? (document.querySelector(
              `#${field.id}-error`,
            ).textContent += `Field cannot be blank`)
          : "";
        // display the error class with message
        document.querySelector(`#${field.id}-error`).classList.remove("hidden");
        field.classList.add("invalid");
      }
    });
    //shut down the world if valid===false
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  // handle input from search form
  function handleSearch(event) {
    event.preventDefault();
    // take fuzzy search logic and go get cars
    rover.fetch(`${carsUrl}?q=${event.target.search.value}`).then(cars => {
      garbageCollector(carsContainer);
      for (let i = 0; i < 9; i++) {
        currentCar = cars[i];
        renderCarCards(cars[i]);
      }
    });
  }

  function filterList(event) {
    // see if year is already chosen
    const yearSelected = document.querySelector("#year").value;
    const yearFilter =
      document.querySelector("#year").value &&
      document.querySelector("#year").value !== ""
        ? `&car_model_year=${document.querySelector("#year").value}`
        : "";
    // see if make is already chosen
    const makeSelected = document.querySelector("#make").value;
    const makeFilter =
      document.querySelector("#make").value &&
      document.querySelector("#make").value !== ""
        ? `&car_make=${document.querySelector("#make").value}`
        : "";
    // see if model is already chosen
    const modelSelected = document.querySelector("#model").value;
    const modelFilter =
      document.querySelector("#model").value &&
      document.querySelector("#model").value !== ""
        ? `&car_model=${document.querySelector("#model").value}`
        : "";
    // build out URL params string with non-empty values
    const params = `${yearFilter}${makeFilter}${modelFilter}`;

    // grab the filtered cars array and render the first 9
    rover.fetch(`${carsUrl}?${params}`).then(cars => {
      // let filterArray = cars.filter(car => (car.car_make = event.target.value));

      // run garbageCollector on modelOptions array
      // now send to buildModelFilter function to rebuild options
      // rebuild the drop-down filters based on selected attributes
      buildYearFilter(cars, yearSelected);
      buildMakeFilter(cars, makeSelected);
      buildModelFilter(cars, modelSelected);

      // clean up in aisle 12
      garbageCollector(carsContainer);
      const maxResults = cars.length >= 9 ? 9 : cars.length;
      for (let i = 0; i < maxResults; i++) {
        currentCar = cars[i];
        renderCarCards(cars[i]);
      }
    });
  }

  // editing functionality
  function handleEdit(card, car) {
    // there is no significance to fox socks except my daughter is obsessed with foxes
    // load current price into edit form
    updaterForm.price.value = document.querySelector(
      `.card[data-id="${car.id}"] .price`,
    ).textContent;
    // year
    updaterForm
      .querySelector(`[value="${car.car_model_year}"]`)
      .setAttribute("selected", "selected");
    // make
    updaterForm.make.value = car.car_make;

    // model
    updaterForm.model.value = car.car_model;

    // color
    updaterForm.color.value = document.querySelector(
      `.card[data-id="${car.id}"]> .color >.fox-socks`,
    ).textContent;
    // condition
    updaterForm
      .querySelector(`[value="${car.condition}"]`)
      .setAttribute("selected", "selected");

    // mileage
    updaterForm.mileage.value = document.querySelector(
      `.card[data-id="${car.id}"]> .mileage >.fox-socks`,
    ).textContent;

    // transmission
    const currentTransmission = document.querySelector(
      `.card[data-id="${car.id}"]> .transmission >.fox-socks`,
    ).textContent;
    updaterForm
      .querySelector(`[value="${currentTransmission}"]`)
      .setAttribute("selected", "selected");

    // fuel-type
    const currentFuel = document.querySelector(
      `.card[data-id="${car.id}"]> .fuel-type >.fox-socks`,
    ).textContent;
    updaterForm
      .querySelector(`[value="${currentFuel}"]`)
      .setAttribute("selected", "selected");

    // imageUrl
    updaterForm.user_image_url.value = document.querySelector(
      `.card[data-id="${car.id}"] .car-image`,
    ).src;

    currentCar = car;
    // unhide the form modal window
    document.querySelector("#modal_outer_frame").classList.remove("hidden");
  }

  // delete functionality
  function handleDelete(car) {
    // WRITE THE DELETE FUNCTION HERE - DONE!
    const card = document.querySelector(`.card[data-id="${car.id}"]`);

    rover.sell(`${carsUrl}/${car.id}`).then(car => {
      card.remove();
    });
  }

  // PATCH func
  function handleSave(event) {
    event.preventDefault();

    const card = document.querySelector(`.card[data-id="${currentCar.id}"]`);

    // build our object to send with Rover
    const data = {
      car_make: event.target.make.value,
      car_model: event.target.model.value,
      car_model_year: event.target.year.value,
      color: event.target.color.value,
      mileage: event.target.mileage.value,
      price: event.target.price.value,
      transmission: event.target.transmission.value,
      fuel_type: event.target.fuel_type.value,
      condition: event.target.condition.value,
      user_image_url: event.target.user_image_url.value,
    };

    card.querySelector("#edit-button").textContent = "Edit";
    // WRITE PATCH FUNCTION HERE:
    rover
      .patch(`${carsUrl}/${currentCar.id}`, data)
      .then(car => {
        updateCard(car); // make sure we update the card after db accepts it
      })
      .catch(err => {
        console.log(err);
      });
  }
  /** ********FORM PROCESSING END****************/

  /** ********DOM RENDER FUNCTIONS START*********/

  // pull generated images from third party API
  function getImage(year, make, model, color) {
    const params = `modelYear=${year}&make=${make}&modelFamily=${model}&paintDescription=${color}`;

    return imagin.image(`${imaginUrl}${params}`);
  }

  function updateCard(car) {
    // price lives in an h2 with class fox-socks
    document.querySelector(
      `.card[data-id="${car.id}"] h2.fox-socks`,
    ).textContent = parseFloat(car.price).toFixed(2);
    // year make model live ni the car-title
    document.querySelector(
      `.card[data-id="${car.id}"] .car-title`,
    ).textContent = `${car.car_model_year} ${car.car_make} ${car.car_model} `;
    // condition
    document.querySelector(
      `.card[data-id="${car.id}"] >.condition > h4`,
    ).textContent = car.condition;
    // mileage
    document.querySelector(
      `.card[data-id="${car.id}"] .mileage > h4`,
    ).textContent = car.mileage;
    // transmission
    document.querySelector(
      `.card[data-id="${car.id}"] .transmission > h4`,
    ).textContent = car.transmission;
    // fuel type
    document.querySelector(
      `.card[data-id="${car.id}"] .fuel-type > h4`,
    ).textContent = car.fuel_type;
    document.querySelector(
      `.card[data-id="${car.id}"] .color> h4`,
    ).textContent = car.color;

    document.querySelector(
      `.card[data-id="${car.id}"] .car-image`,
    ).alt = `${car.car_model_year} ${car.car_make} ${car.car_model}`;

    // use imagin API to generate image for the car based on parameters
    // if there is a user uploaded image, use that
    if (car.user_image_url && car.user_image_url !== "") {
      document.querySelector(`.card[data-id="${car.id}"] .car-image`).src =
        car.user_image_url;
    } else if (car.image) {
      // if no user image check for previous imagin image
      document.querySelector(`.card[data-id="${car.id}"] .car-image`).src =
        car.image;
    } else {
      //go out and get one and store in db for faster next render
      getImage(car.car_model_year, car.car_make, car.car_model, car.color).then(
        image => {
          document.querySelector(`.card[data-id="${car.id}"] .car-image`).src =
            image.url;
          let data = {image: image.url};
          rover
            .patch(`${carsUrl}/${car.id}`, data)
            .then(updated => console.log(updated));
        },
      );
    }
    currentCar = car;
  }

  // the workhorse
  function renderCarCards(car) {
    // create elements
    // <!-- Card -->
    const carCard = document.createElement("div");
    carCard.classList.add("card");
    carCard.setAttribute("data-id", car.id);
    //  <!-- image-->
    const carImage = document.createElement("img");
    carImage.alt = `${car.car_model_year} ${car.car_make} ${car.car_model}`;
    carImage.classList.add("car-image");

    // use imagin API to generate image for the car based on parameters
    if (car.user_image_url && car.user_image_url !== "") {
      carImage.src = car.user_image_url;
    } else if (car.image) {
      carImage.src = car.image;
    } else {
      getImage(car.car_model_year, car.car_make, car.car_model, car.color).then(
        image => {
          carImage.src = image.url;
          let data = {image: image.url};
          rover
            .patch(`${carsUrl}/${car.id}`, data)
            .then(updated => console.log("success!"));
        },
      );
    }

    //  <!-- price container
    const carPriceDiv = document.createElement("div");
    carPriceDiv.classList.add("price-div");
    const dollarSignIcon = document.createElement("i");
    dollarSignIcon.classList.add("fa-solid", "fa-dollar-sign", "dollar-sign");
    const carPrice = document.createElement("h2");
    carPrice.classList.add("cars-text", "price", "fox-socks");
    carPrice.textContent = `${parseFloat(car.price).toFixed(2)}`;
    carPriceDiv.append(dollarSignIcon, carPrice);

    // <!-- DETAILS SECTION
    // year | make | model
    const carYearMakeModelDiv = document.createElement("div");
    const carYearMakeModelText = document.createElement("h2");
    carYearMakeModelDiv.classList.add("car-title-div");
    carYearMakeModelText.classList.add("car-title", "fox-socks");
    carYearMakeModelText.textContent = `${car.car_model_year} ${car.car_make} ${car.car_model} `;
    carYearMakeModelDiv.append(carYearMakeModelText);

    //       <!-- condition -->
    const carConditionDiv = document.createElement("div");
    const carConditionText = document.createElement("h3");
    const carConditionResult = document.createElement("h4");
    carConditionDiv.classList.add("sub-details", "condition");
    carConditionText.textContent = "Condition:";
    carConditionResult.classList.add("fox-socks");
    carConditionResult.textContent = car.condition;
    carConditionDiv.append(carConditionText, carConditionResult);

    //       <!-- mileage-->
    const carMileageDiv = document.createElement("div");
    const carMileageText = document.createElement("h3");
    const carMileageResult = document.createElement("h4");
    carMileageDiv.classList.add("sub-details", "mileage");
    carMileageResult.classList.add("fox-socks");
    carMileageText.textContent = "Mileage:";
    carMileageResult.textContent = car.mileage;
    carMileageDiv.append(carMileageText, carMileageResult);

    //       <!-- transmission -->
    const carTransmissionDiv = document.createElement("div");
    const carTransmissionText = document.createElement("h3");
    const carTransmissionResult = document.createElement("h4");
    carTransmissionDiv.classList.add("sub-details", "transmission");
    carTransmissionResult.classList.add("fox-socks");
    carTransmissionText.textContent = "Transmission:";
    carTransmissionResult.textContent = car.transmission;
    carTransmissionDiv.append(carTransmissionText, carTransmissionResult);

    //       <!-- color-->
    const carColorDiv = document.createElement("div");
    const carColorText = document.createElement("h3");
    const carColorResult = document.createElement("h4");
    carColorDiv.classList.add("sub-details", "color");
    carColorResult.classList.add("fox-socks");
    carColorText.textContent = "Color:";
    carColorResult.textContent = car.color;
    carColorDiv.append(carColorText, carColorResult);

    //      <!-- fuel type-->
    const carFuelTypeDiv = document.createElement("div");
    const carFuelTypeText = document.createElement("h3");
    const carFuelTypeResult = document.createElement("h4");
    carFuelTypeDiv.classList.add("sub-details", "fuel-type");
    carFuelTypeText.textContent = "Fuel Type:";
    carFuelTypeResult.classList.add("fox-socks");
    carFuelTypeResult.textContent = car.fuel_type;
    carFuelTypeDiv.append(carFuelTypeText, carFuelTypeResult);

    //       <!-- contact us button -->
    const carContactUsDiv = document.createElement("div");
    const carContactUsLink = document.createElement("a");
    const carContactUsButton = document.createElement("input");
    carContactUsLink.href = "#footer";
    carContactUsButton.classList.add("contact-us-button");
    carContactUsButton.value = "Contact us today!";
    carContactUsLink.append(carContactUsButton);
    carContactUsDiv.append(carContactUsLink);

    //       <!-- edit/delete buttons -->
    // create
    const carAdminDiv = document.createElement("div");
    const carEditButton = document.createElement("button");
    const carDeleteButton = document.createElement("button");
    // populate
    carAdminDiv.classList.add("admin-button-div", "flex");
    carEditButton.id = "edit-button";
    carDeleteButton.id = "delete-button";
    carEditButton.classList.add("admin-btn");
    carDeleteButton.classList.add("admin-btn");
    carEditButton.textContent = "Edit";
    carDeleteButton.textContent = "Delete listing";
    // tracking and event listeners
    currentCar = car;
    carDeleteButton.addEventListener("click", () => handleDelete(car));
    carEditButton.addEventListener("click", () => {
      carEditButton.textContent === "Edit"
        ? handleEdit(carCard, car)
        : handleSave(currentCar, car);
    });
    isLoggedIn // true -currently false
      ? carAdminDiv.classList.remove("hidden")
      : carAdminDiv.classList.add("hidden");
    // append
    carAdminDiv.append(carEditButton, carDeleteButton);
    // append to DOM

    carCard.append(
      carImage,
      carPriceDiv,
      carYearMakeModelDiv,
      carConditionDiv,
      carMileageDiv,
      carTransmissionDiv,
      carFuelTypeDiv,
      carColorDiv,
      carContactUsDiv,
      carAdminDiv,
    );

    carsContainer.appendChild(carCard);
  }

  /** ********DOM RENDER FUNCTIONS END***********/

  /** *********GENERAL FUNCTIONS START***********/

  // years filter from array of car_model_years
  function buildYearFilter(cars, filter) {
    const yearsFilter = document.querySelector("#year");
    // clean up existing options so new ones aren't appending to the end
    garbageCollector(yearsFilter);
    // use Set to get unique values
    const uniqueYears = [...new Set(cars.map(car => car.car_model_year))];
    // sort descending order
    uniqueYears.sort((a, b) => b - a);
    //ensure top option is populated empty
    const emptyOption = document.createElement("option");
    yearsFilter.append(emptyOption);
    uniqueYears.forEach(year => {
      const yearOption = document.createElement("option");
      yearOption.value = year;
      yearOption.textContent = year;
      //check to see if this option is equal to any arguments to set it as selected
      if (
        (filter !== "" && yearOption.textContent === filter) ||
        uniqueYears.length === 1
      ) {
        yearOption.setAttribute("selected", "selected");
      }
      yearsFilter.append(yearOption);
    });
  }
  // build filter from array of car_make
  function buildMakeFilter(cars, filter) {
    const makeFilter = document.querySelector("#make");
    garbageCollector(makeFilter);
    const uniqueMakes = [...new Set(cars.map(car => car.car_make))];
    uniqueMakes.sort();

    const emptyOption = document.createElement("option");
    makeFilter.append(emptyOption);
    uniqueMakes.forEach(make => {
      const makeOption = document.createElement("option");
      makeOption.value = make;
      makeOption.textContent = make;

      if (
        (filter !== "" && makeOption.textContent === filter) ||
        uniqueMakes.length === 1
      ) {
        makeOption.setAttribute("selected", "selected");
      }
      makeFilter.append(makeOption);
    });
  }

  // build filter from array of car_model
  function buildModelFilter(cars, filter) {
    const modelFilter = document.querySelector("#model");
    garbageCollector(modelFilter);
    const uniqueModels = [...new Set(cars.map(car => car.car_model))];
    uniqueModels.sort();
    const emptyOption = document.createElement("option");
    modelFilter.append(emptyOption);
    uniqueModels.forEach(model => {
      const modelOption = document.createElement("option");
      modelOption.value = model;
      modelOption.textContent = model;
      if (
        (filter !== "" && modelOption.textContent === filter) ||
        uniqueModels.length === 1
      ) {
        modelOption.setAttribute("selected", "selected");
      }
      modelFilter.append(modelOption);
    });
  }

  // oscar the grouch cleaning up
  function garbageCollector(parent) {
    // if the parent has kids, get rid of them
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  }

  /** *********GENERAL FUNCTIONS END*************/

  // start the car sales party
  function initialize() {
    rover.fetch(`${carsUrl}`).then(cars => {
      garbageCollector(carsContainer);

      const maxResults = cars.length >= 9 ? 9 : cars.length;
      for (let i = 0; i < maxResults; i++) {
        window["myCar" + i] = new Car(
          cars[i].car_make,
          cars[i].car_model,
          cars[i].car_model_year,
          cars[i].color,
          cars[i].mileage,
          cars[i].price,
          cars[i].transmission,
          cars[i].fuel_type,
          cars[i].condition,
          cars[i].id,
          cars[i].user_image_url,
          cars[i].image,
        );
        carLot.push(window["myCar" + i]);
        renderCarCards(cars[i]);
      }
      // start off fresh with all options available in the db
      buildYearFilter(cars, "");
      buildMakeFilter(cars, "");
      buildModelFilter(cars, "");
    });
  }
  // start your engines!
  initialize();
});
