<?php

$value = filter_var($value, FILTER_VALIDATE_BOOLEAN);

// 0, 1, yes, no, on, off -> true, false