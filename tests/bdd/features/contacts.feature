Feature: Gestion des contacts

  Scenario: Ajouter un nouveau contact
    Given je suis sur la page de gestion des contacts
    When je remplis le formulaire avec des données valides
    And je clique sur "Ajouter"
    Then je vois le nouveau contact dans la liste

  Scenario: Modifier un contact existant
    Given je suis sur la page de gestion des contacts
    And un contact existe dans la liste
    When je clique sur "Modifier"
    And je change les informations du contact
    And je clique sur "Modifier"
    Then le contact est mis à jour dans la liste

  Scenario: Supprimer un contact
    Given je suis sur la page de gestion des contacts
    And un contact existe dans la liste
    When je clique sur "Supprimer"
    And je confirme la suppression
    Then le contact n'apparaît plus dans la liste
