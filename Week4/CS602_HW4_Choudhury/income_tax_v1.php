<?php


function incomeTaxSingle($taxableIncome) {
    $incTax = 0.0;
    if($taxableIncome >= 0 && $taxableIncome<= 9700){
        $incTax= $taxableIncome*.10;
    }elseif($taxableIncome >= 9701.00 && $taxableIncome<= 39475.00){
        $incTax= 970.00 +($taxableIncome-9700.00)*.12;
    }elseif($taxableIncome >= 39476 && $taxableIncome <= 84200){
        $incTax = 4543.00+ .22*($taxableIncome-39475.00);
    }
    elseif($taxableIncome >= 48201 && $taxableIncome <= 160725){
        $incTax = 14382.00+ .24*($taxableIncome-84200.00);
    }
    elseif($taxableIncome >= 160726.00 && $taxableIncome <= 204100.00){
        $incTax = 32748.00+ .32*($taxableIncome-160725.00);
    }
    elseif($taxableIncome >= 204101 && $taxableIncome <= 510300){
        $incTax = 46628.00+ .35*($taxableIncome-204100.00);
    }else{
        $incTax = 153798.00+ .37*($taxableIncome-510300.00);
    }
    // settype($incTax,double);
    return $incTax;


}

function incomeTaxMarriedJointly($taxableIncome) {
    $incTax = 0.0;
    if($taxableIncome > 0 && $taxableIncome <= 19400){
        $incTax= $taxableIncome*.10;
    }elseif($taxableIncome > 19400.00 && $taxableIncome <= 78950.00){
        $incTax= 1940.00 +($taxableIncome-19400.00)*.12;
    }elseif($taxableIncome > 78950 && $taxableIncome <= 168400){
        $incTax = 9086.00+ .22*($taxableIncome-78950.00);
    }
    elseif($taxableIncome > 168400 && $taxableIncome <= 321450){
        $incTax = 28765.00+ .24*($taxableIncome-168400.00);
    }
    elseif($taxableIncome >321450.00 && $taxableIncome <= 408200.00){
        $incTax = 65497.00+ .32*($taxableIncome-321450.00);
    }
    elseif($taxableIncome > 408200 && $taxableIncome <= 612350.00){
        $incTax = 93257.00+ .35*($taxableIncome-408200.00);
    }else{
        $incTax = 164709.00+ .37*($taxableIncome-612350.00);
    }
    
    return $incTax;

}

function incomeTaxMarriedSeparately($taxableIncome) {
    $incTax = 0.0;
    if($taxableIncome >= 0 && $taxableIncome<= 9700){
        $incTax= $taxableIncome*.10;
    }elseif($taxableIncome > 9700.00 && $taxableIncome<= 39475.00){
        $incTax= 970.00 +($taxableIncome-9700.00)*.12;
    }elseif($taxableIncome > 39475 && $taxableIncome <= 84200){
        $incTax = 4543.00+ .22*($taxableIncome-39475.00);
    }
    elseif($taxableIncome > 84200 && $taxableIncome <= 160725){
        $incTax = 14382.50+ .24*($taxableIncome-84200.00);
    }
    elseif($taxableIncome >160725.00 && $taxableIncome <= 204100.00){
        $incTax = 32748.50+ .32*($taxableIncome-16075.00);
    }
    elseif($taxableIncome > 204100 && $taxableIncome <= 306175.00){
        $incTax = 46628.50+ .35*($taxableIncome-204100.00);
    }else{
        $incTax = 82354.75+ .37*($taxableIncome-306175.00);
    }
    
    return $incTax;

}

function incomeTaxHeadOfHousehold($taxableIncome) {
    $incTax = 0.0;

    if($taxableIncome >= 0 && $taxableIncome<= 13850){
        $incTax= $taxableIncome*.10;
    }elseif($taxableIncome > 13850.00 && $taxableIncome<= 52850.00){
        $incTax= 1385.00 +($taxableIncome-13850.00)*.12;
    }elseif($taxableIncome > 52850 && $taxableIncome <= 84200){
        $incTax = 6065.00+ .22*($taxableIncome-52850.00);
    }
    elseif($taxableIncome > 84200 && $taxableIncome <= 160700){
        $incTax = 12962.00+ .24*($taxableIncome-84200.00);
    }
    elseif($taxableIncome >160700.00 && $taxableIncome <= 204100.00){
        $incTax = 31322.00+ .32*($taxableIncome-160700.00);
    }
    elseif($taxableIncome > 204100 && $taxableIncome <= 510300.00){
        $incTax = 45210.00+ .35*($taxableIncome-204100.00);
    }else{
        $incTax = 152380.00+ .37*($taxableIncome-510300.00);
    }
    
    return $incTax;

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 Part1 - LastName</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">

    <h3>Income Tax Calculator</h3>

    <form class="form-horizontal" method="post">

        
        <div class="form-group">
            <label class="control-label col-sm-2" for="netIncome">Your Net Income:</label>
            <div class="col-sm-10">
            <input type="number" step="any" name="netIncome" placeholder="Taxable  Income" required autofocus>
            </div>
        </div>
        <div class="form-group"> 
            <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
        <?php  
        // if(isset($_POST['netIncome'])) {
        //     setlocale(LC_MONETARY,"en_US");
        //     // echo '<p>With a net taxable income of $'. $_POST['netIncome'] .'</p>';
        //     echo money_format("With a net taxable income of %i", $_POST['netIncome']);
        //  }
        if(isset($_POST['netIncome'])) {
            echo 'With a net taxable income of $'. number_format($_POST['netIncome'], 2);
          }
         ?> 
<div class="table">
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col"><b>Status</b></th>
      <th scope="col"><b>Tax</b></th>

    </tr> 
  </thead>
  <tbody>
    <tr>
      <td>Single</td>
      <td> <?php
        if(isset($_POST['netIncome'])) {
        echo "$" . number_format(incomeTaxSingle($_POST['netIncome']),2);
}

?>

</div></td>
    </tr>
    <tr>
      <td>Married Filing Jointly</td>
      <td>    <?php
            if(isset($_POST['netIncome'])) {
            echo "$" . number_format(incomeTaxMarriedJointly($_POST['netIncome']),2);
        }

?></td>
    </tr>
    <tr>
      <td>Married Filing Separately</td>
      <td>  
         <?php

        if(isset($_POST['netIncome'])) {
            echo "$" . number_format(incomeTaxMarriedSeparately($_POST['netIncome']),2);
        }
?>
</td>
    </tr>
    <tr>
      <td>Head of Household</td>
      <td><?php

if(isset($_POST['netIncome'])) {
    echo "$" . number_format(incomeTaxHeadOfHousehold($_POST['netIncome']),2);

}

?></td>
    </tr>
  </tbody>
</table>

</div>

</form>


</div>

</body>
</html>