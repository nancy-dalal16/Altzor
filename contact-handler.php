<?php 

$errors = '';
$myemail = 'enquiry@altzor.com';
// $myemail = 'nancydalal16@gmail.com';
if(empty($_POST['name'])  ||
	empty($_POST['email']) || empty($_POST['company']) || empty($_POST['role']) ||
	   empty($_POST['mobile']) || 	empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}
else{

$name = $_POST['name'];
$email = $_POST['email']; 
$company = $_POST['company']; 
$role = $_POST['role'];
$mobile = $_POST['mobile'];
$message = $_POST['message'];

 
	$to = $myemail; 
	$email_subject = "Inquiry From: $name";
	$email_body = "Inquiry Details:\n Name: $name \n Email: $email \n Mobile Number: $mobile \n Company / Organization: $company  \n Role / Designation: $role \n Message: $message"; 
	
	$headers = "From: support@altzor.com"; 
	
	mail($to,$email_subject,$email_body,$headers);
	//redirect to the 'thank you' page
	header('Location:thanks.html');
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Contact form handler</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>