# Domain Model

## User
- id
- name
- email
- password

## Character
- id
- name
- nex
- origin
- class

## Attribute
- strength
- agility
- intellect
- vigor
- presence

## Skill
- id
- name
- trainingLevel

## Equipment
- id
- name
- category
- description

## Relationships

- A User can have many Characters.
- A Character has one Attribute set.
- A Character can have many Skills.
- A Character can have many Equipment items.

## SRP

Each class has a single responsibility.

## DIP

Services will depend on repository abstractions instead of concrete implementations.