<?php

define('TAX_RATES',
  array(
    'Single' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,9700,39475,84200,160725,204100,510300),
      'MinTax' => array(0, 970,4543,14382,32748,46628,153798)
      ),
    'Married_Jointly' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,19400,78950,168400,321450,408200,612350),
      'MinTax' => array(0, 1940,9086,28765,65497,93257,164709)
      ),
    'Married_Separately' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,9700,39475,84200,160725,204100,306175),
      'MinTax' => array(0, 970,4543,14382.50,32748.50,46628.50,82354.75)
      ),
    'Head_Household' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,13850,52850,84200,160700,204100,510300),
      'MinTax' => array(0, 1385,6065,12962,31322,45210,152380)
      )
    )
);

function incomeTax($taxableIncome, $status) {

    $incTax = 0.0;
    $taxStatus = TAX_RATES[$status]; //i.e. SINGLE
    $rates = $taxStatus["Rates"];
    $ranges = $taxStatus["Ranges"];
    $minMax = $taxStatus["MinTax"];
    $rangeLength =count($ranges);
    $incomeindex = 0;
    for($i = 1; $i<=$rangeLength; $i=$i+1){
      // echo $minMax[$i] . "<br>";
      if($taxableIncome < $ranges[$i] && $taxableIncome >= $ranges[$i-1]){
            $incomeindex = $i-1;
            break;
      }
    }

    $incTax = $minMax[$incomeindex]+($rates[$incomeindex] / 100) * ($taxableIncome - $ranges[$incomeindex]);


    return number_format($incTax,2);

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 Part2 - LastName</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>

<body>

<div class="container">

    <h3>Income Tax Calculator</h3>

    <form class="form-horizontal" method="post">

      <div class="form-group">
        <label class="control-label col-sm-2">Enter Net Income:</label>
        <div class="col-sm-10">
          <input type="number"  step="any" name="netIncome" placeholder="Taxable  Income" required autofocus>
        </div>
      </div>
      <div class="form-group"> 
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>

    </form>
    <?php
    if(isset($_POST['netIncome'])) {
      echo '<p>With a net taxable income of $'. number_format($_POST['netIncome'],2) .'</p>';
      echo '<div class="table">
      <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col"><b>Status</b></th>
          <th scope="col"><b>Tax</b></th>
        </tr> 
      </thead>
      <tbody>';
      foreach (TAX_RATES as $status => $statusValue) {
        echo '
        <tr>
         <td>' . $status . '</td>
         <td>' . "$" . incomeTax($_POST['netIncome'], $status) . '</td>
        </tr>';
      }
    }
  echo '</tbody>
  </table> 
  </div>';
    ?>

    <h3>2019 Tax Tables</h3>

  <?php
  
  foreach(TAX_RATES as $states =>$statusValue){
    $taxStatus = TAX_RATES[$states]; //i.e. SINGLE
    $rates = $taxStatus["Rates"];
    $ranges = $taxStatus["Ranges"];
    $minTax = $taxStatus["MinTax"];
    $lastRate = end($rates);
    $lastRange = end($ranges);
    $lastMintax = end($minTax);
    echo '<p style="padding-left: 10px"><b>'. $states . '</b></p>
    <table class="table" style="border: 1px solid black; style= padding-left: 10px;">
    <thead class="thead-dark">
      <tr>
        <th scope="col"><b>Taxable Income</b></th>
        <th scope="col"><b>Tax Rate</b></th>
      </tr> 
    </thead>
    <tbody>
      <tr>
        <td style="border-right: 1px solid black; padding: 5px;">$0- $'.number_format($ranges[1],2). '</td>
        <td style="padding: 5px">'.number_format($rates[0],2).'%</td>
      </tr>';
          for($i = 1; $i < (count($rates)-1); $i=$i+1){
            echo'<tr>
            <td style="border-right: 1px solid black; padding: 5px;">$'.number_format(($ranges[$i]+1),2).' - $'.number_format($ranges[$i+1],2). '</td>
            <td style="padding: 5px">$'.number_format($minTax[$i],2).' plus '.$rates[$i].'% of the amount over $'.number_format($ranges[$i],2).'</td>
            </tr>';
          }
        echo '<tr>
        <td style="border-right: 1px solid black; padding: 5px;">$'.number_format($lastRange,2).' or more</td>
        <td style="padding: 5px">$'.number_format($lastMintax,2).' plus '.$lastRate.'% of the amount over $'.number_format($lastRange,2).'</td>
    </tr>
    </tbody>
    </table>';
  }

      

    ?>

   
       
</div>

</body>
</html>