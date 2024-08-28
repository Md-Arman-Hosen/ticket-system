let selected_seats = [];
let coupon_codes = ['NEW15', 'Couple 20'];

let single_seat = document.querySelectorAll('.single_seat');
single_seat.forEach(seat => {
    seat.addEventListener('click', () => {

        // prevent user from selecting more than 4 seats
        if(selected_seats.length < 4 || seat.classList.contains('selected')) {

            selection(seat); // select or deselect clicked seat
            getSelectedSeat(seat); // update array with all selected seat numbers
            seatAmount() // update amount of available/selected seats 
            summary() // update sumary
            coupon() // update coupon
            grand_total() // update grand total
            checkout() // show modal on checkout

        }
        
    });
});


// add or remove selection on seat
function selection(elem) {
    if(elem.hasAttribute('selected')) {
        elem.classList.remove('selected');
        elem.removeAttribute('selected');
    }else {
        elem.classList.add('selected');
        elem.setAttribute('selected', '');
    }
}


// get all selected seat into array
function getSelectedSeat() {
    selected_seats = [];
    single_seat.forEach(seat => {
        if(seat.hasAttribute('selected')){
            selected_seats.push(seat.getAttribute('seat'));
        }
    })
}


// update amount of available/selected seats 
function seatAmount() {
    let amount_of_selected_seat = selected_seats.length;
    let amount_of_available_seat = 40 - amount_of_selected_seat;

    // update available seat amount
    document.querySelector('#available_seats').innerHTML = amount_of_available_seat + " Seats left";

    // update available seat amount
    document.querySelector('#selected_seat_amount').innerHTML = amount_of_selected_seat;  
}


// update summury 
function summary() {
    let summary_items_parent = document.querySelector('#summary_items_wraper');
    let total_price_tag = document.querySelector('#total_price');

    summary_items_parent.innerHTML = '';

    selected_seats.forEach(seat => {

        // update single ticket 
        let tr = document.createElement('tr');
        tr.innerHTML =  `
                <td>${seat}</td>       
                <td>Economoy</td>
                <td>550</td>`;
        summary_items_parent.appendChild(tr);

    });

    // update total price
    let total_price = selected_seats.length * 550;
    total_price_tag.innerHTML = "BDT " + total_price;
    total_price_tag.setAttribute('price', total_price);

    // Update grand total
    grand_total();
}


// coupon
function coupon() {
    let coupon_input_wrap = document.querySelector('.coupon_input_wrap');
    let coupon_input = document.querySelector('#coupon_input');
    let coupon_button = document.querySelector('#apply_coupon');
    let discount_price = document.querySelector('.discount_price');
    let total_price = Number(document.querySelector('#total_price').getAttribute('price'))

    // ennable coupon if selected seat is 4
    if(selected_seats.length == 4) {
        coupon_input_wrap.style.display = 'flex';

        // apply coupon
        coupon_button.addEventListener('click', ()=> {
            if(coupon_input.value == coupon_codes[0] || coupon_input.value == coupon_codes[1]){

                let discount_price_wrap = document.querySelector('#discount_price_row');
                discount_price_wrap.style.display = 'flex';

                if(coupon_input.value == coupon_codes[0]){

                    discount_price.innerHTML = "BDT -" + (total_price/100)*15;
                    discount_price.setAttribute('price', (total_price/100)*15);
                    coupon_input_wrap.style.display = 'none'

                }else if(coupon_input.value == coupon_codes[1]) {

                    discount_price.innerHTML = "BDT -" + (total_price/100)*20;
                    discount_price.setAttribute('price', (total_price/100)*20);
                    coupon_input_wrap.style.display = 'none'

                }

            }else { 
                openError("Sorry! The coupon you entered is not valid", "Only coupons available are 'NEW15' and 'Couple 20'.")
            }

            // update grand total
            grand_total()
        })


    }else {
        let discount_price_wrap = document.querySelector('#discount_price_row');
        discount_price_wrap.style.display = 'none';
        discount_price.innerHTML = "BDT -" + 0;
        discount_price.setAttribute('price', 0);
        
        coupon_input_wrap.style.display = 'none';
    }

}


// update grand total
function grand_total() {
    let grand_total_calc = Number(document.querySelector('#total_price').getAttribute('price')) - Number(document.querySelector('.discount_price').getAttribute('price'));
    document.querySelector('.grand_price').innerHTML = "BDT " + grand_total_calc;
    document.querySelector('.grand_price').setAttribute('price', grand_total_calc);
}


// checkout 
function checkout() {

    document.querySelector('.submit_button').addEventListener('click', (e)=>{

        if(selected_seats.length == 0) {
            openError("You need to select at list one seat.", '')
        }else if(document.querySelector('#number').value == '') {
            openError("Phone number is required", '')
        }else {

            let success_modal = document.querySelector('#success_modal');
            let close_error_btn = document.querySelector('#close_success');
            success_modal.style.display = "block";

            close_error_btn.addEventListener('click', ()=> {
                success_modal.style.display = "none";
            })

        }

    })
    
}
checkout();


// open error modal
function openError(title, messege) {
    let error_modal = document.querySelector('#error_modal');
    let error_headline = document.querySelector('#error_headline');
    let error_text = document.querySelector('#error_text');
    let close_error = document.querySelector('#close_error');
    error_modal.style.display = 'block';

    error_headline.innerHTML = title;
    error_text.innerHTML = messege;

    close_error.addEventListener('click', ()=>{
        error_modal.style.display = 'none';
        console.log('sa')
    })
}