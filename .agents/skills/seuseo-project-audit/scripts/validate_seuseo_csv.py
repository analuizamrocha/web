#!/usr/bin/env python3
"""Validate a SeuSEO keyword import CSV without external dependencies."""

from __future__ import annotations

import argparse
import csv
import math
import sys
import unicodedata
from pathlib import Path


EXPECTED_HEADER = ["keyword", "cluster", "intent", "priority"]


def normalize_keyword(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value)
    return " ".join(normalized.casefold().split())


def is_numeric(value: str) -> bool:
    try:
        number = float(value)
    except ValueError:
        return False
    return math.isfinite(number)


def validate(path: Path) -> list[str]:
    errors: list[str] = []

    try:
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            if reader.fieldnames != EXPECTED_HEADER:
                return [
                    "Header must be exactly: " + ",".join(EXPECTED_HEADER),
                    f"Found: {reader.fieldnames!r}",
                ]

            seen: dict[str, int] = {}
            row_count = 0

            for line_number, row in enumerate(reader, start=2):
                row_count += 1
                keyword = (row.get("keyword") or "").strip()
                priority = (row.get("priority") or "").strip()

                if not keyword:
                    errors.append(f"Line {line_number}: keyword is required")
                    continue

                normalized = normalize_keyword(keyword)
                if normalized in seen:
                    errors.append(
                        f"Line {line_number}: duplicate keyword after normalization "
                        f"(first seen on line {seen[normalized]})"
                    )
                else:
                    seen[normalized] = line_number

                if priority and not is_numeric(priority):
                    errors.append(
                        f"Line {line_number}: priority must be numeric, found {priority!r}"
                    )

            if row_count == 0:
                errors.append("CSV contains no keyword rows")

    except FileNotFoundError:
        errors.append(f"File not found: {path}")
    except UnicodeDecodeError:
        errors.append("File must be UTF-8 encoded")
    except csv.Error as error:
        errors.append(f"CSV parsing error: {error}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv_path", type=Path)
    args = parser.parse_args()

    errors = validate(args.csv_path)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    with args.csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        row_count = sum(1 for _ in csv.DictReader(handle))
    print(f"OK: {args.csv_path} contains {row_count} valid keyword rows")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
