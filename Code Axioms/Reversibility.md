Nothing is more dangerous than an idea if it's the only one you have. 

-Emil-Auguste Chartier, Propos sur la religion, 1938

> Put everything that might change, into a single place where if we have to change it in the future, we only change once. 

Examples: 
1. **Environment Files**

2. To make decisions based on the logged-in user's `role_id` in multiple files, avoid directly using `session('role_id') == 1` in every file. Instead, centralize this logic in a single location that all files can access. For example, you can define a helper function or a configuration file to handle role-based decisions. This approach ensures that if the logic changes in the future, you only need to update it in one place, reducing redundancy and potential errors.

3. Database Access layer, to change any database types in the future.


Example:

```php
// In a helper file or a centralized location
function isAdmin() {
    return session('role_id') == 1;
}

// Usage in other files
if (isAdmin()) {
    // Perform admin-specific actions
}
```
---

Engineers prefer simple, single solutions to problems. Math tests that allow you to proclaim with great confidence that x = 2 are much more comfortable than fuzzy, warm essays about the myriad causes of the French Revolution. Management tends to agree with the engineers: single, easy answers fit nicely on spreadsheets and project plans. If only the real world would cooperate! Unfortunately, while x is 2 today, it may need to be 5 tomorrow, and 3 next week. Nothing is foreverand if you rely heavily on some fact, you can almost guarantee that it will change.

There is always more than one way to implement something, and there is usually more than one vendor available to provide a third-party product. If you go into a project hampered by the myopic notion that there is only one way to do it, you may be in for an unpleasant surprise. Many project teams have their eyes forcibly opened as the future unfolds: "But you said we'd use database XYZ! We are 85% done coding the project, we can't change now!" the programmer protested. "Sorry, but our company decided to standardize on database PDQ insteadfor all projects. It's out of my hands. We'll just have to recode. All of you will be working weekends until further notice." Changes don't have to be that Draconian, or even that immediate. But as time goes by, and your project progresses, you may find yourself stuck in an untenable position. With every critical decision, the project team commits to a smaller targeta narrower version of reality that has fewer options. By the time many critical decisions have been made, the target becomes so small that if it moves, or the wind changes direction, or a butterfly in Tokyo flaps its wings, you miss.[4] And you may miss by a huge amount.

Take a nonlinear, or chaotic, system and apply a small change to one of its inputs. You may get a large and often unpredictable result. The clichéd butterfly flapping its wings in Tokyo could be the start of a chain of events that ends up generating a tornado in Texas. Does this sound like any projects you know? The problem is that critical decisions aren't easily reversible. Once you decide to use this vendor's database, or that architectural pattern, or a certain deployment model (client-server versus standalone, for instance), you are committed to a course of action that cannot be undone, except at great expense. 

we don't always make the best decisions the first time around. We commit to a certain technology only to discover we can't hire enough people with the necessary skills. We lock in a certain third-party vendor just before they get bought out by their competitor. Requirements, users, and hardware change faster than we can get the software developed. Suppose you decide, early in the project, to use a relational database from vendor A. Much later, during performance testing, you discover that the database is simply too slow, but that the object database from vendor B is faster. With most conventional projects, you'd be out of luck. Most of the time, calls to third-party products are entangled throughout the code. But if you really abstracted the idea of a database outto the point where it simply provides persistence as a servicethen you have the flexibility to change horses in midstream. Similarly, suppose the project begins as a client-server model, but then, late in the game, marketing decides that servers are too expensive for some clients, and they want a stand-alone version. How hard would that be for you? Since it's just a deployment issue, it shouldn't take more than a few days. If it would take longer, then you haven't thought about reversibility. The other direction is even more interesting. What if the stand-alone product you are making needs to be deployed in a client-server or n-tier fashion? That shouldn't be hard either. The mistake lies in assuming that any decision is cast in stoneand in not preparing for the contingencies that might arise. Instead of carving decisions in stone, think of them more as being written in the sand at the beach. A big wave can come along and wipe them out at any time

Tip 14 There Are No Final Decisions