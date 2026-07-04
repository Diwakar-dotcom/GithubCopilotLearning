---
name: reverse-string
description: 'Reverse a string in any programming language using industry best practices. Use when you need to reverse strings efficiently and correctly across different languages.'
---

# Reverse String Skill

## When to Use
- Reverse a string in any programming language
- Need efficient, idiomatic string reversal
- Want to follow language-specific best practices

## Industry Best Practices by Language

### JavaScript / TypeScript
```javascript
// Best: Spread operator (handles Unicode correctly)
const reversed = [...str].reverse().join('');

// Alternative: Array.from (also handles Unicode)
const reversed = Array.from(str).reverse().join('');

// Avoid: str.split('').reverse().join('') - breaks on surrogate pairs/emoji
```

### Python
```python
# Best: Slice notation (most Pythonic, handles Unicode)
reversed_str = s[::-1]

# Alternative: reversed() + join
reversed_str = ''.join(reversed(s))
```

### Java
```java
// Best: StringBuilder (mutable, efficient)
String reversed = new StringBuilder(str).reverse().toString();

// Alternative: StringBuffer (thread-safe, slower)
String reversed = new StringBuffer(str).reverse().toString();
```

### C#
```csharp
// Best: LINQ Reverse (handles Unicode)
string reversed = new string(str.Reverse().ToArray());

// Alternative: StringBuilder
string reversed = new StringBuilder(str).Reverse().ToString();
```

### Go
```go
// Best: Convert to rune slice (handles Unicode correctly)
func Reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}
```

### Rust
```rust
// Best: chars().rev().collect() (handles Unicode graphemes)
let reversed: String = s.chars().rev().collect();

// For grapheme clusters (complex emoji), use unicode-segmentation crate
```

### C++
```cpp
// Best: std::reverse (in-place, efficient)
std::string reversed = str;
std::reverse(reversed.begin(), reversed.end());

// Alternative: reverse iterator
std::string reversed(str.rbegin(), str.rend());
```

### Java (Alternative - Manual)
```java
// Manual reversal (for learning/constraints)
char[] chars = str.toCharArray();
for (int i = 0, j = chars.length - 1; i < j; i++, j--) {
    char temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
}
String reversed = new String(chars);
```

## Key Best Practices

1. **Handle Unicode correctly** - Use grapheme-aware methods (runes, chars, code points) not byte/char arrays
2. **Use built-in methods** - Prefer standard library functions over manual loops
3. **Consider performance** - StringBuilder/StringBuffer for mutable operations in Java/C#
4. **Avoid split('')** - Breaks on surrogate pairs (emoji, rare characters)
5. **Test with emoji** - "👨‍👩‍👧‍👦" should reverse correctly as a single grapheme

## Procedure
1. Identify the target programming language
2. Use the language-specific best practice from above
3. Test with Unicode strings including emoji
4. Consider performance for large strings