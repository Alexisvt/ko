import ko from 'knockout';

import { SeatReservation } from './ViewModels/SeatReservation';

class ReservationsViewModel {
  constructor() {
    // Non-editable catalog data - would come from the server
    this.availableMeals = [
      { mealName: 'Standard (sandwich)', price: 0 },
      { mealName: 'Premium (lobster)', price: 34.95 },
      { mealName: 'Ultimate (whole zebra)', price: 290 },
    ];

    // Editable data
    this.seats = ko.observableArray([
      new SeatReservation('Steve', this.availableMeals[0]),
      new SeatReservation('Bert', this.availableMeals[1]),
    ]);

    this.totalSurcharge = ko.computed(() => {
      let total = 0;

      this.seats().forEach(seat => {
        total += seat.meal().price;
      });

      return total;
    });

    // Binding the function to the correct context
    this.removeSeat = this.removeSeat.bind(this);
    this.addSet = this.addSet.bind(this);
  }

  addSet() {
    this.seats.push(new SeatReservation('', this.availableMeals[2]));
  }

  /**
   * Remove a seat from the list
   * @param {SeatReservation} seat 
   */
  removeSeat(seat) {
    this.seats.remove(seat);
  }
}

// Activates knockout.js
ko.applyBindings(new ReservationsViewModel());
