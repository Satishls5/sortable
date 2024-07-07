var myArray = [
    {'name':'Arun', 'age':'30', 'birthdate':'11/10/1989'},
    {'name':'Bala', 'age':'32', 'birthdate':'10/1/1989'},
    {'name':'Darun', 'age':'29', 'birthdate':'10/14/1990'},
    {'name':'Vicky', 'age':'25', 'birthdate':'11/29/1993'},
    {'name':'Naveen', 'age':'27', 'birthdate':'3/12/1991'},
    {'name':'Yogesh', 'age':'24', 'birthdate':'10/31/1995'},
];

$(document).ready(function() {
    buildTable(myArray);

    $('th').on('click', function() {
        var column = $(this).data('column');
        var order = $(this).data('order');
        var text = $(this).html().replace(' &#9650;', '').replace(' &#9660;', ''); // Remove any existing arrow indicators

        if (order === 'desc') {
            $(this).data('order', 'asc');
            myArray.sort((a, b) => a[column] > b[column] ? 1 : -1);
            text += ' &#9660;'; // Downward arrow for ascending sort
        } else {
            $(this).data('order', 'desc');
            myArray.sort((a, b) => a[column] < b[column] ? 1 : -1);
            text += ' &#9650;'; // Upward arrow for descending sort
        }

        $('th').html(function() {
            return $(this).html().replace(' &#9650;', '').replace(' &#9660;', ''); // Remove arrow indicators from all headers
        });

        $(this).html(text); // Add arrow indicator to clicked header
        buildTable(myArray); // Rebuild table with sorted data
    });

    $('#addPersonForm').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var age = $('#age').val();
        var birthdate = $('#birthdate').val();

        // Validate input
        if (!name || !age || !birthdate) {
            alert('Please fill out all fields.');
            return;
        }

        // Add new person to array
        var newPerson = {'name': name, 'age': age, 'birthdate': birthdate};
        myArray.push(newPerson);

        // Rebuild table with updated data
        buildTable(myArray);

        // Reset form fields
        $('#addPersonForm')[0].reset();
    });
});

function buildTable(data) {
    var table = $('#myTable');
    table.empty(); // Clear existing table rows

    $.each(data, function(index, value) {
        var row = `<tr>
                        <td>${value.name}</td>
                        <td>${value.age}</td>
                        <td>${value.birthdate}</td>
                   </tr>`;
        table.append(row); // Append each row to the table body
    });
}
