<?php

namespace App\Traits;

trait ApiResponse {
    public function sendResponse($data, $status, $message)
    {
        $response = [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];

        return response()->json($response, $status);
    }

    function sendError($message, $code = 403)
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        return response()->json($response, $code);
    }
}
