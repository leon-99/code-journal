# Eloqunt Bulk Insert

```php

                $leavesData = [];
                foreach ($request->leave_types as $leave_type_id) {
                    $leave_type = LeaveType::findOrFail($leave_type_id);
                    $given_leave = $this->calculateGivenLeaveDays($user, $leave_type);
                    $leavesData[] = [
                        'user_id' => $user->id,
                        'leave_type_id' => $leave_type_id,
                        'given_leave' => $given_leave,
                        'available_leave' => $given_leave,
                    ];
                }
                AvailableLeave::insert($leavesData); // Bulk insert
```
