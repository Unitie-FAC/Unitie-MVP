$(document).ready(function () {
    $('table').each(function () {
        var $table = $(this);

        var $button = $("<button type='button'>");
        $button.text("Export to spreadsheet");
        $button.insertAfter($table);

        $button.click(function () {
            var csv = $table.table2CSV({
                delivery: 'value'
            });
            window.location.href = 'data:text/csv;charset=UTF-8,'
            + encodeURIComponent(csv);
        });
    });
});
