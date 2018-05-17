const ticketName = document.getElementById('ticketName');
const ticketSeverity = document.getElementById('ticketSeverity');
const ticketOwner = document.getElementById('ticketOwner');
const ticketDescription = document.getElementById('ticketDescription');
const ticketSubmit = document.getElementById('ticketSubmit');
const myTicketList = document.getElementById('myTicketList');

ticketSubmit.addEventListener('click', addNewTicket);

function randomNum() {
    return Math.floor(Math.random() * 10000);
}

function Issue(name, severity, owner, description) {
    this.name = name;
    this.severity = severity;
    this.owner = owner;
    this.description = description;
    this.status = 'Open';
    this.date = new Date;
    this.number = randomNum();
}

function addNewTicket() {

    let ticket = new Issue(ticketName.value, ticketSeverity.value, ticketOwner.value, ticketDescription.value);

    let tickets = JSON.parse(localStorage.getItem('tickets'))

    if(!tickets) {
        tickets = [];
        tickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    } else {
        tickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }
    renderTickets();
    ticketName.value = '';
    ticketSeverity.value = 'High';
    ticketOwner.value = '';
    ticketDescription.value = '';
}

function renderTickets() {
    myTicketList.innerHTML = '';
    const tickets = JSON.parse(localStorage.getItem('tickets'));
    if(tickets) {
        for(let i = 0; i < tickets.length; i++) {
            const div = document.createElement('div');
            div.innerHTML = `
              <div class="card mt-4">
                <div class="card-header">
                  Ticket Number: ${tickets[i].number}
                  <span class="badge badge-pill badge-primary">${tickets[i].severity}</span>
                  <span class="badge badge-pill badge-success status">${tickets[i].status}</span>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${tickets[i].name}</h5>
                  <p class="card-text">${tickets[i].description}</p>
                  <p><small>Owner: ${tickets[i].owner}</small></p>
                  <a id="${tickets[i].number}" class="btn btn-primary closeTicket">Close</a>
                  <a id="${tickets[i].number}" class="btn btn-danger deleteTicket">Delete</a>
                </div>
                <div class="card-footer text-muted">
                  ${tickets[i].date}
                </div>
              </div>
              `;
            myTicketList.appendChild(div);
        }
    }
    deleteTicketsListener();
    closeTicketsListener();
}

function deleteTicketsListener() {
    const deleteTicket = document.getElementsByClassName('deleteTicket');
    for(var i = 0; i < deleteTicket.length; i++) {
        deleteTicket[i].addEventListener('click', deleteTheTicket);
    }

}

function deleteTheTicket(e) {
    const sure = confirm('Are you sure you want to delete?');
    if(sure) {
        let toDelete = e.target.id;
        const tickets = JSON.parse(localStorage.getItem('tickets'));
        for(var i = 0; i < tickets.length; i++) {
            if(tickets[i].number == toDelete) {
                tickets.splice(i, 1);
                localStorage.setItem('tickets', JSON.stringify(tickets));
            }
        }
        renderTickets();
    }
}

function closeTicketsListener() {
    const closeTicket = document.getElementsByClassName('closeTicket');
    for(var i = 0; i < closeTicket.length; i++) {
        closeTicket[i].addEventListener('click', closeTheTicket);
    }
}

function closeTheTicket(e) {
    const sure = confirm('Are you sure you want to close?');
    if(sure) {
        let toClose = e.target.id;
        const tickets = JSON.parse(localStorage.getItem('tickets'));
        for(var i = 0; i < tickets.length; i++) {
            if(tickets[i].number == toClose) {
                tickets[i].status = 'Closed';
                localStorage.setItem('tickets', JSON.stringify(tickets));
            }
        }
        renderTickets();
    }
}

renderTickets();
