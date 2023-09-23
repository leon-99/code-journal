# Many To Many Pivot

## Tables

posts {
    id
}

comment {
    id
}

post_comment {
    post_id,
    comment_id
}
// post_comment with no s at the end.

---

## In Post Model

```php
public function comments()
{
    return $this->belongsToMany(Comment::class)
}
```
---

## In Comment Model

```php
public function posts()
{
    return $this->belongsToMany(Post::class)
}
```
---

## Usage

Attach comment id 2 to post id 1.

```php
$post = Post::find(1);
$post->comments()->attach(2);
```

Detach comment id 2 from post id 1.

```php
$post = Post::find(1);
$post->comments()->detach(2);
```

or detach every comments from post

```php
$post = Post::find();
$post->detach();
```
---